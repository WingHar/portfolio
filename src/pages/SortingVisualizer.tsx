import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, RotateCcw, Info, Shuffle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface BarState {
  value: number;
  color: string;
}

type Algorithm = 'bubble' | 'merge';

const SortingVisualizer = () => {
  const navigate = useNavigate();
  const bubbleCanvasRef = useRef<HTMLCanvasElement>(null);
  const mergeCanvasRef = useRef<HTMLCanvasElement>(null);
  const [arraySize, setArraySize] = useState(20);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 300 });

  useEffect(() => {
    const updateCanvasSize = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;
      setCanvasSize({
        width: isMobile ? Math.min(window.innerWidth - 64, 500) : isTablet ? 450 : 500,
        height: isMobile ? Math.min((window.innerWidth - 64) * 0.6, 300) : 300,
      });
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);
  const [speed, setSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<Algorithm | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  
  const [bubbleArray, setBubbleArray] = useState<number[]>([]);
  const [mergeArray, setMergeArray] = useState<number[]>([]);
  const [bubbleSteps, setBubbleSteps] = useState<number[][]>([]);
  const [mergeSteps, setMergeSteps] = useState<number[][]>([]);
  const [bubbleStepIndex, setBubbleStepIndex] = useState(0);
  const [mergeStepIndex, setMergeStepIndex] = useState(0);
  const [bubbleComparisons, setBubbleComparisons] = useState(0);
  const [mergeComparisons, setMergeComparisons] = useState(0);
  const [bubbleSwaps, setBubbleSwaps] = useState(0);
  const [mergeSwaps, setMergeSwaps] = useState(0);

  // Generate random array
  const generateArray = useCallback(() => {
    const newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1);
    }
    setBubbleArray([...newArray]);
    setMergeArray([...newArray]);
    setBubbleSteps([]);
    setMergeSteps([]);
    setBubbleStepIndex(0);
    setMergeStepIndex(0);
    setBubbleComparisons(0);
    setMergeComparisons(0);
    setBubbleSwaps(0);
    setMergeSwaps(0);
    setIsRunning(false);
    setCurrentAlgorithm(null);
  }, [arraySize]);

  // Initialize array on mount and when size changes
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Bubble Sort algorithm with step tracking
  const bubbleSort = useCallback((arr: number[]): number[][] => {
    const steps: number[][] = [];
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;

    steps.push([...array]); // Initial state

    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        comparisons++;
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swaps++;
          steps.push([...array]);
        }
      }
    }

    setBubbleComparisons(comparisons);
    setBubbleSwaps(swaps);
    return steps;
  }, []);

  // Merge Sort algorithm with step tracking
  const mergeSort = useCallback((arr: number[]): number[][] => {
    const steps: number[][] = [];
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;

    steps.push([...array]); // Initial state

    const merge = (arr: number[], left: number, mid: number, right: number) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      
      let i = 0, j = 0, k = left;

      while (i < leftArr.length && j < rightArr.length) {
        comparisons++;
        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          i++;
        } else {
          arr[k] = rightArr[j];
          j++;
          swaps++;
        }
        k++;
        steps.push([...arr]);
      }

      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
        steps.push([...arr]);
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
        steps.push([...arr]);
      }
    };

    const sort = (arr: number[], left: number, right: number) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        sort(arr, left, mid);
        sort(arr, mid + 1, right);
        merge(arr, left, mid, right);
      }
    };

    sort(array, 0, array.length - 1);
    setMergeComparisons(comparisons);
    setMergeSwaps(swaps);
    return steps;
  }, []);

  // Start visualization
  const startVisualization = useCallback((algorithm: Algorithm) => {
    setIsRunning(true);
    setCurrentAlgorithm(algorithm);
    
    if (algorithm === 'bubble') {
      const steps = bubbleSort(bubbleArray);
      setBubbleSteps(steps);
      setBubbleStepIndex(0);
    } else {
      const steps = mergeSort(mergeArray);
      setMergeSteps(steps);
      setMergeStepIndex(0);
    }
  }, [bubbleArray, mergeArray, bubbleSort, mergeSort]);

  // Animation loop
  useEffect(() => {
    if (!isRunning || !currentAlgorithm) return;

    const interval = setInterval(() => {
      if (currentAlgorithm === 'bubble') {
        if (bubbleStepIndex < bubbleSteps.length - 1) {
          setBubbleStepIndex(prev => prev + 1);
          setBubbleArray([...bubbleSteps[bubbleStepIndex + 1]]);
        } else {
          setIsRunning(false);
          setCurrentAlgorithm(null);
        }
      } else {
        if (mergeStepIndex < mergeSteps.length - 1) {
          setMergeStepIndex(prev => prev + 1);
          setMergeArray([...mergeSteps[mergeStepIndex + 1]]);
        } else {
          setIsRunning(false);
          setCurrentAlgorithm(null);
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isRunning, currentAlgorithm, bubbleStepIndex, mergeStepIndex, bubbleSteps, mergeSteps, speed]);

  // Draw bars on canvas
  const drawBars = useCallback((canvas: HTMLCanvasElement, array: number[], algorithm: Algorithm) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Update canvas size if needed
    if (canvas.width !== canvasSize.width || canvas.height !== canvasSize.height) {
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / array.length;
    const maxValue = Math.max(...array, 100);

    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * canvas.height;
      const x = index * barWidth;
      const y = canvas.height - barHeight;

      // Color based on algorithm state
      let color = '#3b82f6'; // Default blue
      
      if (algorithm === 'bubble' && isRunning && currentAlgorithm === 'bubble') {
        const currentStep = bubbleSteps[bubbleStepIndex];
        if (currentStep) {
          // Highlight comparing/swapping elements
          if (bubbleStepIndex > 0) {
            const prevStep = bubbleSteps[bubbleStepIndex - 1];
            if (prevStep) {
              // Find which elements changed
              for (let i = 0; i < prevStep.length - 1; i++) {
                if (prevStep[i] !== currentStep[i]) {
                  if (index === i || index === i + 1) {
                    color = '#10b981'; // Green for swapping
                  }
                }
              }
            }
          }
        }
      } else if (algorithm === 'merge' && isRunning && currentAlgorithm === 'merge') {
        // For merge sort, highlight elements being merged
        if (mergeStepIndex > 0) {
          const prevStep = mergeSteps[mergeStepIndex - 1];
          if (prevStep) {
            for (let i = 0; i < prevStep.length; i++) {
              if (prevStep[i] !== array[i] && index === i) {
                color = '#10b981'; // Green for merged
              }
            }
          }
        }
      }

      // Draw bar
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth - 2, barHeight);

      // Draw value on bar if space allows
      if (barWidth > 20) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
      }
    });
  }, [isRunning, currentAlgorithm, bubbleSteps, bubbleStepIndex, mergeSteps, mergeStepIndex]);

  // Draw canvases
  useEffect(() => {
    if (bubbleCanvasRef.current) {
      drawBars(bubbleCanvasRef.current, bubbleArray, 'bubble');
    }
    if (mergeCanvasRef.current) {
      drawBars(mergeCanvasRef.current, mergeArray, 'merge');
    }
  }, [bubbleArray, mergeArray, canvasSize, drawBars]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentAlgorithm(null);
    generateArray();
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-portfolio-primary-dark flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 py-16 mt-16">
        <Button
          onClick={() => navigate('/engineering')}
          variant="outline"
          className="mb-8 border-portfolio-tertiary/30 text-portfolio-primary-light hover:bg-portfolio-tertiary/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Engineering Projects
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Sorting Algorithm Visualizer</span>
          </h1>
          <p className="text-base sm:text-xl text-portfolio-primary-light max-w-3xl">
            Compare Bubble Sort and Merge Sort side by side. Watch how different algorithms approach the same problem with varying time complexities and strategies.
          </p>
        </div>

        {/* Info Card */}
        {showInfo && (
          <Card className="bg-portfolio-primary border-portfolio-secondary mb-8 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Info className="w-5 h-5 mr-2" />
                About Sorting Algorithms
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInfo(false)}
                className="text-portfolio-primary-light hover:text-white"
              >
                ×
              </Button>
            </div>
            <div className="text-portfolio-primary-light space-y-2">
              <p>
                <strong className="text-white">Bubble Sort:</strong> A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
              </p>
              <p><strong className="text-white">Time Complexity:</strong> O(n²) worst case, O(n) best case</p>
              <p><strong className="text-white">Space Complexity:</strong> O(1)</p>
              <p className="mt-4">
                <strong className="text-white">Merge Sort:</strong> A divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges them back together.
              </p>
              <p><strong className="text-white">Time Complexity:</strong> O(n log n) in all cases</p>
              <p><strong className="text-white">Space Complexity:</strong> O(n)</p>
            </div>
          </Card>
        )}

        {/* Controls */}
        <Card className="bg-portfolio-primary border-portfolio-secondary mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-portfolio-primary-light mb-2">
                Array Size
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={arraySize}
                onChange={(e) => {
                  setArraySize(Number(e.target.value));
                  setIsRunning(false);
                }}
                className="w-full"
                disabled={isRunning}
              />
              <div className="text-center text-sm text-portfolio-primary-light mt-1">
                {arraySize} elements
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-portfolio-primary-light mb-2">
                Speed (ms)
              </label>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full"
                disabled={isRunning}
              />
              <div className="text-center text-sm text-portfolio-primary-light mt-1">
                {speed}ms
              </div>
            </div>
            <div className="flex items-end gap-2">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={generateArray}
                variant="outline"
                className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary"
                disabled={isRunning}
              >
                <Shuffle className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-end">
              {isRunning ? (
                <Button
                  onClick={handlePause}
                  className="bg-red-600 hover:bg-red-700 text-white w-full"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <div className="flex gap-2 w-full">
                  <Button
                    onClick={() => startVisualization('bubble')}
                    className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white flex-1"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Bubble Sort
                  </Button>
                  <Button
                    onClick={() => startVisualization('merge')}
                    className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white flex-1"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Merge Sort
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bubble Sort */}
          <Card className="bg-portfolio-primary border-portfolio-secondary p-6">
            <h3 className="text-xl font-bold text-white mb-4">Bubble Sort</h3>
            <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
              <div>
                <span className="text-portfolio-primary-light">Comparisons: </span>
                <span className="text-white font-bold">{bubbleComparisons}</span>
              </div>
              <div>
                <span className="text-portfolio-primary-light">Swaps: </span>
                <span className="text-white font-bold">{bubbleSwaps}</span>
              </div>
              <div>
                <span className="text-portfolio-primary-light">Step: </span>
                <span className="text-white font-bold">{bubbleStepIndex} / {bubbleSteps.length - 1}</span>
              </div>
            </div>
            <div className="flex justify-center overflow-x-auto">
              <canvas
                ref={bubbleCanvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className="border border-portfolio-secondary rounded max-w-full"
              />
            </div>
          </Card>

          {/* Merge Sort */}
          <Card className="bg-portfolio-primary border-portfolio-secondary p-6">
            <h3 className="text-xl font-bold text-white mb-4">Merge Sort</h3>
            <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
              <div>
                <span className="text-portfolio-primary-light">Comparisons: </span>
                <span className="text-white font-bold">{mergeComparisons}</span>
              </div>
              <div>
                <span className="text-portfolio-primary-light">Merges: </span>
                <span className="text-white font-bold">{mergeSwaps}</span>
              </div>
              <div>
                <span className="text-portfolio-primary-light">Step: </span>
                <span className="text-white font-bold">{mergeStepIndex} / {mergeSteps.length - 1}</span>
              </div>
            </div>
            <div className="flex justify-center overflow-x-auto">
              <canvas
                ref={mergeCanvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className="border border-portfolio-secondary rounded max-w-full"
              />
            </div>
          </Card>
        </div>

        {/* Comparison Stats */}
        <Card className="bg-portfolio-primary border-portfolio-secondary p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Algorithm Comparison</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-portfolio-tertiary mb-2">Bubble Sort</h4>
              <ul className="text-portfolio-primary-light space-y-1 text-sm">
                <li>• Time Complexity: O(n²)</li>
                <li>• Space Complexity: O(1)</li>
                <li>• Stable: Yes</li>
                <li>• Best for: Smaller datasets</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-portfolio-tertiary mb-2">Merge Sort</h4>
              <ul className="text-portfolio-primary-light space-y-1 text-sm">
                <li>• Time Complexity: O(n log n)</li>
                <li>• Space Complexity: O(n)</li>
                <li>• Stable: Yes</li>
                <li>• Best for: Larger datasets</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default SortingVisualizer;

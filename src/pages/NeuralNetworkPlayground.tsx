import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, RotateCcw, Info, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface DataPoint {
  x: number;
  y: number;
  label: number; // 0 or 1
}

interface Layer {
  neurons: number;
  weights: number[][];
  biases: number[];
}

const NeuralNetworkPlayground = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const networkCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });
  const [networkCanvasSize, setNetworkCanvasSize] = useState({ width: 400, height: 300 });

  useEffect(() => {
    const updateCanvasSizes = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;
      setCanvasSize({
        width: isMobile ? Math.min(window.innerWidth - 64, 400) : 400,
        height: isMobile ? Math.min(window.innerWidth - 64, 400) : 400,
      });
      setNetworkCanvasSize({
        width: isMobile ? Math.min(window.innerWidth - 64, 400) : isTablet ? 350 : 400,
        height: isMobile ? Math.min((window.innerWidth - 64) * 0.75, 300) : 300,
      });
    };
    
    updateCanvasSizes();
    window.addEventListener('resize', updateCanvasSizes);
    return () => window.removeEventListener('resize', updateCanvasSizes);
  }, []);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(0);
  const [learningRate, setLearningRate] = useState(0.1);
  const [hiddenNeurons, setHiddenNeurons] = useState(4);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [currentLabel, setCurrentLabel] = useState<number>(0);
  const [showInfo, setShowInfo] = useState(true);

  // Neural network structure: 2 input -> hidden -> 1 output
  const [network, setNetwork] = useState<{
    inputLayer: Layer;
    hiddenLayer: Layer;
    outputLayer: Layer;
  } | null>(null);

  // Initialize network weights and biases
  const initializeNetwork = useCallback(() => {
    const hiddenWeights: number[][] = [];
    const hiddenBiases: number[] = [];
    for (let i = 0; i < hiddenNeurons; i++) {
      hiddenWeights.push([
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      ]);
      hiddenBiases.push(Math.random() * 2 - 1);
    }

    const outputWeights: number[][] = [];
    const outputBiases: number[] = [];
    for (let i = 0; i < 1; i++) {
      outputWeights.push(Array(hiddenNeurons).fill(0).map(() => Math.random() * 2 - 1));
      outputBiases.push(Math.random() * 2 - 1);
    }

    setNetwork({
      inputLayer: { neurons: 2, weights: [], biases: [] },
      hiddenLayer: { neurons: hiddenNeurons, weights: hiddenWeights, biases: hiddenBiases },
      outputLayer: { neurons: 1, weights: outputWeights, biases: outputBiases },
    });
    setEpoch(0);
    setLoss(0);
    setIsTraining(false); // Stop training when reinitializing
  }, [hiddenNeurons]);

  // Initialize on mount
  useEffect(() => {
    initializeNetwork();
  }, [initializeNetwork]);

  // Sigmoid activation function
  const sigmoid = (x: number): number => {
    return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
  };

  // Derivative of sigmoid
  const sigmoidDerivative = (x: number): number => {
    return x * (1 - x);
  };

  // Forward propagation
  const forward = useCallback((input: number[], currentNetwork: typeof network): { hidden: number[]; output: number } => {
    if (!currentNetwork || !currentNetwork.hiddenLayer.weights.length || !currentNetwork.outputLayer.weights.length) {
      return { hidden: [], output: 0.5 };
    }

    // Input to hidden
    const hidden: number[] = [];
    const numHidden = currentNetwork.hiddenLayer.weights.length;
    for (let i = 0; i < numHidden; i++) {
      if (i >= currentNetwork.hiddenLayer.biases.length || 
          i >= currentNetwork.hiddenLayer.weights.length ||
          currentNetwork.hiddenLayer.weights[i].length < 2) {
        continue;
      }
      let sum = currentNetwork.hiddenLayer.biases[i];
      sum += input[0] * currentNetwork.hiddenLayer.weights[i][0];
      sum += input[1] * currentNetwork.hiddenLayer.weights[i][1];
      hidden.push(sigmoid(sum));
    }

    // Hidden to output
    if (hidden.length === 0 || !currentNetwork.outputLayer.weights[0]) {
      return { hidden, output: 0.5 };
    }

    let outputSum = currentNetwork.outputLayer.biases[0];
    for (let i = 0; i < hidden.length && i < currentNetwork.outputLayer.weights[0].length; i++) {
      outputSum += hidden[i] * currentNetwork.outputLayer.weights[0][i];
    }
    const output = sigmoid(outputSum);

    return { hidden, output };
  }, []);

  // Calculate loss (Mean Squared Error)
  const calculateLoss = useCallback((): number => {
    if (dataPoints.length === 0 || !network) return 0;
    let totalLoss = 0;
    dataPoints.forEach(point => {
      const { output } = forward([point.x, point.y], network);
      const error = output - point.label;
      totalLoss += error * error;
    });
    return totalLoss / dataPoints.length;
  }, [dataPoints, network, forward]);

  // Train one epoch
  const trainEpoch = useCallback(() => {
    if (dataPoints.length === 0 || !network) return;
    
    // Validate network structure
    if (!network.hiddenLayer.weights.length || 
        network.hiddenLayer.weights.length !== hiddenNeurons ||
        !network.outputLayer.weights.length ||
        network.outputLayer.weights[0].length !== hiddenNeurons) {
      return;
    }

    const hiddenWeights = network.hiddenLayer.weights.map(row => [...row]);
    const hiddenBiases = [...network.hiddenLayer.biases];
    const outputWeights = network.outputLayer.weights.map(row => [...row]);
    const outputBiases = [...network.outputLayer.biases];

    // Process each data point
    dataPoints.forEach(point => {
      const input = [point.x, point.y];
      const { hidden, output } = forward(input, network);
      if (hidden.length === 0) return; // Skip if forward pass failed
      
      const target = point.label;

      // Calculate output error
      const outputError = output - target;
      const outputDelta = outputError * sigmoidDerivative(output);

      // Update output layer
      for (let i = 0; i < hidden.length && i < hiddenNeurons; i++) {
        outputWeights[0][i] -= learningRate * outputDelta * hidden[i];
      }
      outputBiases[0] -= learningRate * outputDelta;

      // Calculate hidden layer errors
      const hiddenErrors: number[] = [];
      for (let i = 0; i < hidden.length && i < hiddenNeurons; i++) {
        const error = outputDelta * network.outputLayer.weights[0][i];
        hiddenErrors.push(error);
      }

      // Update hidden layer
      for (let i = 0; i < hidden.length && i < hiddenNeurons; i++) {
        if (i >= hiddenWeights.length || hiddenWeights[i].length < 2) continue;
        const hiddenDelta = hiddenErrors[i] * sigmoidDerivative(hidden[i]);
        hiddenWeights[i][0] -= learningRate * hiddenDelta * input[0];
        hiddenWeights[i][1] -= learningRate * hiddenDelta * input[1];
        hiddenBiases[i] -= learningRate * hiddenDelta;
      }
    });

    const updatedNetwork = {
      inputLayer: network.inputLayer,
      hiddenLayer: { neurons: hiddenNeurons, weights: hiddenWeights, biases: hiddenBiases },
      outputLayer: { neurons: 1, weights: outputWeights, biases: outputBiases },
    };

    setNetwork(updatedNetwork);
    setEpoch(prev => prev + 1);
    
    // Calculate and set loss
    const newLoss = calculateLossWithNetwork(updatedNetwork);
    setLoss(newLoss);
  }, [dataPoints, network, learningRate, hiddenNeurons, forward]);

  // Helper function to calculate loss with a specific network
  const calculateLossWithNetwork = useCallback((currentNetwork: typeof network): number => {
    if (dataPoints.length === 0 || !currentNetwork) return 0;
    let totalLoss = 0;
    dataPoints.forEach(point => {
      const { output } = forward([point.x, point.y], currentNetwork);
      const error = output - point.label;
      totalLoss += error * error;
    });
    return totalLoss / dataPoints.length;
  }, [dataPoints, forward]);

  // Update loss after network changes
  useEffect(() => {
    if (network && dataPoints.length > 0) {
      const newLoss = calculateLossWithNetwork(network);
      setLoss(newLoss);
    }
  }, [network, dataPoints, calculateLossWithNetwork]);

  // Draw data points and decision boundary
  const drawDataCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !network) return;
    
    // Update canvas size if needed
    if (canvas.width !== canvasSize.width || canvas.height !== canvasSize.height) {
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
    }

    // Validate network structure
    if (!network.hiddenLayer.weights.length || 
        network.hiddenLayer.weights.length !== hiddenNeurons ||
        !network.outputLayer.weights.length) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw decision boundary
    const resolution = 2;
    for (let x = 0; x < canvas.width; x += resolution) {
      for (let y = 0; y < canvas.height; y += resolution) {
        const normalizedX = (x / canvas.width) * 2 - 1;
        const normalizedY = 1 - (y / canvas.height) * 2;
        const { output } = forward([normalizedX, normalizedY], network);
        
        const intensity = Math.floor(output * 255);
        ctx.fillStyle = `rgb(${255 - intensity}, ${intensity}, 100)`;
        ctx.fillRect(x, y, resolution, resolution);
      }
    }

    // Draw data points
    dataPoints.forEach(point => {
      const x = ((point.x + 1) / 2) * canvas.width;
      const y = ((1 - point.y) / 2) * canvas.height;

      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = point.label === 1 ? '#10b981' : '#ef4444';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [dataPoints, network, forward, hiddenNeurons]);

  // Draw neural network structure
  const drawNetwork = useCallback(() => {
    const canvas = networkCanvasRef.current;
    if (!canvas || !network) return;
    
    // Update canvas size if needed
    if (canvas.width !== networkCanvasSize.width || canvas.height !== networkCanvasSize.height) {
      canvas.width = networkCanvasSize.width;
      canvas.height = networkCanvasSize.height;
    }

    // Validate network structure
    if (!network.hiddenLayer.weights.length || 
        network.hiddenLayer.weights.length !== hiddenNeurons ||
        !network.outputLayer.weights.length ||
        network.outputLayer.weights[0].length !== hiddenNeurons) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const layerSpacing = canvas.width / 4;
    const nodeRadius = 20;
    const nodeSpacing = 60;

    // Draw layers
    const layers = [
      { count: 2, x: layerSpacing, label: 'Input' },
      { count: hiddenNeurons, x: layerSpacing * 2, label: 'Hidden' },
      { count: 1, x: layerSpacing * 3, label: 'Output' },
    ];

    layers.forEach((layer, layerIdx) => {
      const startY = (canvas.height - (layer.count - 1) * nodeSpacing) / 2;

      // Draw connections to next layer
      if (layerIdx < layers.length - 1) {
        const nextLayer = layers[layerIdx + 1];
        const nextStartY = (canvas.height - (nextLayer.count - 1) * nodeSpacing) / 2;

        for (let i = 0; i < layer.count; i++) {
          for (let j = 0; j < nextLayer.count; j++) {
            const y1 = startY + i * nodeSpacing;
            const y2 = nextStartY + j * nodeSpacing;

            let weight = 0;
            if (layerIdx === 0) {
              // Input to hidden
              if (j < network.hiddenLayer.weights.length && 
                  i < network.hiddenLayer.weights[j].length) {
                weight = network.hiddenLayer.weights[j][i];
              }
            } else {
              // Hidden to output
              if (j < network.outputLayer.weights[0].length) {
                weight = network.outputLayer.weights[0][j];
              }
            }

            const opacity = Math.min(1, Math.abs(weight));
            ctx.strokeStyle = weight > 0 
              ? `rgba(16, 185, 129, ${opacity})` 
              : `rgba(239, 68, 68, ${opacity})`;
            ctx.lineWidth = Math.max(0.5, Math.abs(weight) * 3);
            ctx.beginPath();
            ctx.moveTo(layer.x + nodeRadius, y1);
            ctx.lineTo(nextLayer.x - nodeRadius, y2);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < layer.count; i++) {
        const y = startY + i * nodeSpacing;

        ctx.beginPath();
        ctx.arc(layer.x, y, nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = layerIdx === 0 ? '#3b82f6' : layerIdx === 1 ? '#8b5cf6' : '#10b981';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(layer.label, layer.x, y + nodeRadius + 15);
      }
    });
  }, [network, hiddenNeurons]);

  // Handle canvas click to add data point
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / canvas.width) * 2 - 1;
    const normalizedY = 1 - (y / canvas.height) * 2;

    setDataPoints(prev => [...prev, {
      x: normalizedX,
      y: normalizedY,
      label: currentLabel,
    }]);
  };

  // Draw canvases when dependencies change - this should trigger on every network update
  useEffect(() => {
    if (network) {
      // Use requestAnimationFrame to ensure smooth updates
      requestAnimationFrame(() => {
        drawDataCanvas();
        drawNetwork();
      });
    }
  }, [network, dataPoints, hiddenNeurons, canvasSize, networkCanvasSize, drawDataCanvas, drawNetwork]);

  // Training loop
  useEffect(() => {
    if (isTraining && dataPoints.length > 0 && network) {
      // Validate network before training
      if (network.hiddenLayer.weights.length === hiddenNeurons &&
          network.outputLayer.weights.length > 0 &&
          network.outputLayer.weights[0].length === hiddenNeurons) {
        const interval = setInterval(() => {
          trainEpoch();
        }, 100);
        return () => clearInterval(interval);
      } else {
        setIsTraining(false);
      }
    }
  }, [isTraining, trainEpoch, dataPoints.length, network, hiddenNeurons]);

  const handleReset = () => {
    setIsTraining(false);
    setDataPoints([]);
    initializeNetwork();
  };

  // Don't render until network is initialized
  if (!network) {
    return (
      <div className="min-h-screen bg-portfolio-primary-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

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
            <span className="text-gradient flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <Brain className="w-8 h-8 sm:w-12 sm:h-12" />
              Neural Network Playground
            </span>
          </h1>
          <p className="text-base sm:text-xl text-portfolio-primary-light max-w-3xl">
            An interactive visualization of a neural network learning to classify data points. Watch as the network learns through backpropagation and gradient descent.
          </p>
        </div>

        {/* Info Card */}
        {showInfo && (
          <Card className="bg-portfolio-primary border-portfolio-secondary mb-8 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Info className="w-5 h-5 mr-2" />
                About Neural Networks
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
                <strong className="text-white">Neural Networks</strong> are computing systems inspired by biological neural networks. They learn patterns from data through a process called backpropagation.
              </p>
              <p><strong className="text-white">Key Concepts:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Forward Propagation:</strong> Data flows through the network to produce predictions</li>
                <li><strong>Backpropagation:</strong> Errors are propagated backward to update weights</li>
                <li><strong>Gradient Descent:</strong> Weights are adjusted to minimize the loss function</li>
                <li><strong>Activation Function:</strong> Sigmoid function introduces non-linearity</li>
                <li><strong>Decision Boundary:</strong> The network learns to separate different classes</li>
              </ul>
              <p className="mt-2">
                <strong className="text-white">Instructions:</strong> Click on the canvas to add data points. Green points are class 1, red points are class 0. Click "Train" to watch the network learn!
              </p>
            </div>
          </Card>
        )}

        {/* Controls */}
        <Card className="bg-portfolio-primary border-portfolio-secondary mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-portfolio-primary-light mb-2">
                Learning Rate
              </label>
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(Number(e.target.value))}
                className="w-full"
                disabled={isTraining}
              />
              <div className="text-center text-sm text-portfolio-primary-light mt-1">
                {learningRate.toFixed(2)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-portfolio-primary-light mb-2">
                Hidden Neurons
              </label>
              <input
                type="range"
                min="2"
                max="8"
                step="1"
                value={hiddenNeurons}
                onChange={(e) => {
                  setHiddenNeurons(Number(e.target.value));
                  setIsTraining(false);
                }}
                className="w-full"
                disabled={isTraining}
              />
              <div className="text-center text-sm text-portfolio-primary-light mt-1">
                {hiddenNeurons}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-portfolio-primary-light mb-2">
                Data Point Label
              </label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setCurrentLabel(0)}
                  className={`flex-1 ${currentLabel === 0 ? 'bg-red-600' : 'bg-gray-600'}`}
                >
                  Class 0 (Red)
                </Button>
                <Button
                  size="sm"
                  onClick={() => setCurrentLabel(1)}
                  className={`flex-1 ${currentLabel === 1 ? 'bg-green-600' : 'bg-gray-600'}`}
                >
                  Class 1 (Green)
                </Button>
              </div>
            </div>
            <div className="flex items-end">
              <div className="flex gap-2 w-full">
                <Button
                  onClick={() => setIsTraining(!isTraining)}
                  disabled={dataPoints.length === 0}
                  className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white flex-1"
                >
                  {isTraining ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Train
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
            <div>
              <span className="text-portfolio-primary-light">Epoch: </span>
              <span className="text-white font-bold">{epoch}</span>
            </div>
            <div>
              <span className="text-portfolio-primary-light">Loss: </span>
              <span className="text-white font-bold">{loss.toFixed(4)}</span>
            </div>
            <div>
              <span className="text-portfolio-primary-light">Data Points: </span>
              <span className="text-white font-bold">{dataPoints.length}</span>
            </div>
          </div>
        </Card>

        {/* Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Data Canvas */}
          <Card className="bg-portfolio-primary border-portfolio-secondary p-6">
            <h3 className="text-xl font-bold text-white mb-4">Classification Canvas</h3>
            <p className="text-sm text-portfolio-primary-light mb-4">
              Click to add data points. The colored background shows the network's decision boundary.
            </p>
            <div className="flex justify-center overflow-x-auto">
              <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                onClick={handleCanvasClick}
                className="border border-portfolio-secondary rounded cursor-crosshair max-w-full"
              />
            </div>
          </Card>

          {/* Network Structure */}
          <Card className="bg-portfolio-primary border-portfolio-secondary p-6">
            <h3 className="text-xl font-bold text-white mb-4">Neural Network Structure</h3>
            <p className="text-sm text-portfolio-primary-light mb-4">
              Visual representation of the network. Line thickness and color represent weight values.
            </p>
            <div className="flex justify-center overflow-x-auto">
              <canvas
                ref={networkCanvasRef}
                width={networkCanvasSize.width}
                height={networkCanvasSize.height}
                className="border border-portfolio-secondary rounded max-w-full"
              />
            </div>
          </Card>
        </div>

        {/* Legend */}
        <Card className="bg-portfolio-primary border-portfolio-secondary p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Legend</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
              <span className="text-portfolio-primary-light">Class 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white"></div>
              <span className="text-portfolio-primary-light">Class 0</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
              <span className="text-portfolio-primary-light">Input Layer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white"></div>
              <span className="text-portfolio-primary-light">Hidden Layer</span>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default NeuralNetworkPlayground;

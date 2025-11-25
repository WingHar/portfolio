import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, RotateCcw, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

interface DijkstraState {
  distances: Record<string, number>;
  previous: Record<string, string | null>;
  visited: Set<string>;
  current: string | null;
  queue: string[];
  path: string[];
  step: number;
}

const DijkstraVisualization = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStart, setSelectedStart] = useState<string>('A');
  const [selectedEnd, setSelectedEnd] = useState<string>('F');
  const [showInfo, setShowInfo] = useState(true);

  // Graph structure - responsive positions
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 400 });
  
  useEffect(() => {
    const updateCanvasSize = () => {
      const isMobile = window.innerWidth < 768;
      setCanvasSize({
        width: isMobile ? Math.min(window.innerWidth - 64, 500) : 500,
        height: isMobile ? Math.min((window.innerWidth - 64) * 0.8, 400) : 400,
      });
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const nodes: Node[] = useMemo(() => [
    { id: 'A', x: canvasSize.width * 0.2, y: canvasSize.height * 0.375, label: 'A' },
    { id: 'B', x: canvasSize.width * 0.5, y: canvasSize.height * 0.25, label: 'B' },
    { id: 'C', x: canvasSize.width * 0.8, y: canvasSize.height * 0.375, label: 'C' },
    { id: 'D', x: canvasSize.width * 0.5, y: canvasSize.height * 0.625, label: 'D' },
    { id: 'E', x: canvasSize.width * 0.2, y: canvasSize.height * 0.75, label: 'E' },
    { id: 'F', x: canvasSize.width * 0.8, y: canvasSize.height * 0.75, label: 'F' },
  ], [canvasSize.width, canvasSize.height]);

  const edges: Edge[] = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'D', weight: 2 },
    { from: 'B', to: 'C', weight: 5 },
    { from: 'B', to: 'D', weight: 1 },
    { from: 'C', to: 'F', weight: 3 },
    { from: 'D', to: 'E', weight: 3 },
    { from: 'D', to: 'F', weight: 6 },
    { from: 'E', to: 'F', weight: 2 },
  ];

  const [dijkstraState, setDijkstraState] = useState<DijkstraState>({
    distances: {},
    previous: {},
    visited: new Set(),
    current: null,
    queue: [],
    path: [],
    step: 0,
  });

  // Initialize Dijkstra's algorithm
  const initializeDijkstra = () => {
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const queue: string[] = [];

    nodes.forEach(node => {
      distances[node.id] = node.id === selectedStart ? 0 : Infinity;
      previous[node.id] = null;
      queue.push(node.id);
    });

    setDijkstraState({
      distances,
      previous,
      visited: new Set(),
      current: selectedStart,
      queue: queue.sort((a, b) => distances[a] - distances[b]),
      path: [],
      step: 0,
    });
    setCurrentStep(0);
  };

  // Run one step of Dijkstra's algorithm
  const runDijkstraStep = () => {
    setDijkstraState(prev => {
      // Check if algorithm is complete
      if (prev.queue.length === 0) {
        // Find shortest path
        const path: string[] = [];
        let current: string | null = selectedEnd;
        while (current) {
          path.unshift(current);
          current = prev.previous[current] || null;
        }
        // Only return path if it starts from selectedStart
        if (path.length > 0 && path[0] === selectedStart) {
          return { ...prev, path, step: prev.step + 1 };
        }
        return { ...prev, path: [], step: prev.step + 1 };
      }

      const queue = [...prev.queue].sort((a, b) => prev.distances[a] - prev.distances[b]);
      const current = queue[0];
      const visited = new Set(prev.visited);
      visited.add(current);
      const newQueue = queue.slice(1);

      const distances = { ...prev.distances };
      const previous = { ...prev.previous };

      // Update distances for neighbors
      edges
        .filter(edge => edge.from === current && !visited.has(edge.to))
        .forEach(edge => {
          const alt = distances[current] + edge.weight;
          if (alt < distances[edge.to]) {
            distances[edge.to] = alt;
            previous[edge.to] = current;
          }
        });

      // Check if we just visited the end node, then calculate path
      let path = prev.path;
      if (current === selectedEnd) {
        // Find shortest path using the updated previous object
        const calculatedPath: string[] = [];
        let pathNode: string | null = selectedEnd;
        while (pathNode) {
          calculatedPath.unshift(pathNode);
          pathNode = previous[pathNode] || null;
        }
        // Only set path if it's valid (starts from selectedStart)
        if (calculatedPath.length > 0 && calculatedPath[0] === selectedStart) {
          path = calculatedPath;
        }
      }

      return {
        distances,
        previous,
        visited,
        current,
        queue: newQueue,
        path,
        step: prev.step + 1,
      };
    });
    setCurrentStep(prev => prev + 1);
  };

  // Draw the graph
  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      if (!fromNode || !toNode) return;

      const isInPath = dijkstraState.path.includes(edge.from) && 
                       dijkstraState.path.includes(edge.to) &&
                       Math.abs(dijkstraState.path.indexOf(edge.from) - dijkstraState.path.indexOf(edge.to)) === 1;
      const isVisited = dijkstraState.visited.has(edge.from) || dijkstraState.visited.has(edge.to);

      ctx.strokeStyle = isInPath 
        ? '#10b981' // green for path
        : isVisited 
          ? '#3b82f6' // blue for visited
          : '#6b7280'; // gray for unvisited
      ctx.lineWidth = isInPath ? 3 : 1;
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();

      // Draw weight
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(midX - 15, midY - 10, 30, 20);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(edge.weight.toString(), midX, midY + 4);
    });

    // Draw nodes
    nodes.forEach(node => {
      const isStart = node.id === selectedStart;
      const isEnd = node.id === selectedEnd;
      const isCurrent = dijkstraState.current === node.id;
      const isVisited = dijkstraState.visited.has(node.id);
      const isInPath = dijkstraState.path.includes(node.id);

      let color = '#6b7280'; // gray
      if (isInPath) color = '#10b981'; // green
      else if (isCurrent) color = '#f59e0b'; // orange
      else if (isVisited) color = '#3b82f6'; // blue
      else if (isStart) color = '#10b981'; // green
      else if (isEnd) color = '#ef4444'; // red

      // Draw node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw node label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + 5);

      // Draw distance
      if (dijkstraState.distances[node.id] !== undefined) {
        const distance = dijkstraState.distances[node.id];
        const distanceText = distance === Infinity ? '∞' : distance.toString();
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(node.x - 20, node.y - 50, 40, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.fillText(`d: ${distanceText}`, node.x, node.y - 35);
      }
    });
  };

  useEffect(() => {
    initializeDijkstra();
  }, [selectedStart, selectedEnd]);

  useEffect(() => {
    drawGraph();
  }, [dijkstraState, selectedStart, selectedEnd]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (dijkstraState.queue.length > 0 && !dijkstraState.visited.has(selectedEnd)) {
          runDijkstraStep();
        } else {
          setIsRunning(false);
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [isRunning, dijkstraState, speed, selectedEnd]);

  const handleReset = () => {
    setIsRunning(false);
    initializeDijkstra();
  };

  const handleStep = () => {
    if (dijkstraState.queue.length > 0 && !dijkstraState.visited.has(selectedEnd)) {
      runDijkstraStep();
    }
  };

  const shortestPathDistance = dijkstraState.distances[selectedEnd] === Infinity 
    ? 'No path found' 
    : dijkstraState.distances[selectedEnd];

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
            <span className="text-gradient">Dijkstra's Algorithm Visualization</span>
          </h1>
          <p className="text-base sm:text-xl text-portfolio-primary-light max-w-3xl">
            An interactive visualization of Dijkstra's shortest path algorithm, demonstrating fundamental graph theory and algorithm design principles.
          </p>
        </div>

        {/* Info Card */}
        {showInfo && (
          <Card className="bg-portfolio-primary border-portfolio-secondary mb-8 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Info className="w-5 h-5 mr-2" />
                About Dijkstra's Algorithm
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
                <strong className="text-white">Dijkstra's Algorithm</strong> is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights.
              </p>
              <p><strong className="text-white">Time Complexity:</strong> O(V²) or O(E log V) with priority queue</p>
              <p><strong className="text-white">Space Complexity:</strong> O(V)</p>
              <p><strong className="text-white">Key Concepts:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Greedy algorithm approach</li>
                <li>Maintains a set of visited nodes and tentative distances</li>
                <li>At each step, selects the unvisited node with the smallest tentative distance</li>
                <li>Updates distances to all neighbors of the selected node</li>
                <li>Continues until the destination is reached or all nodes are visited</li>
              </ul>
            </div>
          </Card>
        )}

        {/* Controls */}
        <Card className="bg-portfolio-primary border-portfolio-secondary mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-portfolio-primary-light mb-2">
                Start Node
              </label>
              <select
                value={selectedStart}
                onChange={(e) => {
                  setSelectedStart(e.target.value);
                  setIsRunning(false);
                }}
                className="w-full bg-portfolio-primary-dark border border-portfolio-secondary text-white rounded px-3 py-2"
                disabled={isRunning}
              >
                {nodes.map(node => (
                  <option key={node.id} value={node.id}>{node.id}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-portfolio-primary-light mb-2">
                End Node
              </label>
              <select
                value={selectedEnd}
                onChange={(e) => {
                  setSelectedEnd(e.target.value);
                  setIsRunning(false);
                }}
                className="w-full bg-portfolio-primary-dark border border-portfolio-secondary text-white rounded px-3 py-2"
                disabled={isRunning}
              >
                {nodes.map(node => (
                  <option key={node.id} value={node.id}>{node.id}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-portfolio-primary-light mb-2">
                Speed (ms)
              </label>
              <input
                type="range"
                min="200"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full"
                disabled={isRunning}
              />
              <div className="text-center text-sm text-portfolio-primary-light mt-1">
                {speed}ms
              </div>
            </div>
            <div className="flex items-end">
              <div className="flex gap-2 w-full">
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  disabled={dijkstraState.queue.length === 0 || dijkstraState.visited.has(selectedEnd)}
                  className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white flex-1"
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleStep}
                  disabled={isRunning || dijkstraState.queue.length === 0 || dijkstraState.visited.has(selectedEnd)}
                  variant="outline"
                  className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary"
                >
                  Step
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
              <span className="text-portfolio-primary-light">Step: </span>
              <span className="text-white font-bold">{currentStep}</span>
            </div>
            <div>
              <span className="text-portfolio-primary-light">Shortest Distance: </span>
              <span className="text-white font-bold">{shortestPathDistance}</span>
            </div>
            <div className="break-words">
              <span className="text-portfolio-primary-light">Path: </span>
              <span className="text-white font-bold">
                {dijkstraState.path.length > 0 
                  ? dijkstraState.path.join(' → ') 
                  : 'Not found yet'}
              </span>
            </div>
          </div>
        </Card>

        {/* Visualization Canvas */}
        <Card className="bg-portfolio-primary border-portfolio-secondary p-4 sm:p-6 mb-8">
          <div className="flex justify-center overflow-x-auto">
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              className="border border-portfolio-secondary rounded max-w-full"
            />
          </div>
        </Card>

        {/* Legend */}
        <Card className="bg-portfolio-primary border-portfolio-secondary p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Legend</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
              <span className="text-portfolio-primary-light">Start/Path</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white"></div>
              <span className="text-portfolio-primary-light">End</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
              <span className="text-portfolio-primary-light">Visited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white"></div>
              <span className="text-portfolio-primary-light">Current</span>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default DijkstraVisualization;

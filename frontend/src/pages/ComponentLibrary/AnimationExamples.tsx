import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Badge, 
  Spinner, 
  Tooltip,
  Tabs,
  PageTransition
} from '../../components/UI';
import {
  BeakerIcon,
  DocumentIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/outline';

const AnimationExamples: React.FC = () => {
  const [showCard, setShowCard] = useState(false);
  const [transitionType, setTransitionType] = useState<'fade' | 'slide-up' | 'slide-down' | 'scale'>('fade');
  
  const tabItems = [
    {
      id: 'buttons',
      label: 'Buttons',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Button Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">Interactive States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Hover Me</Button>
                  <Button 
                    variant="secondary" 
                    leftIcon={<DocumentIcon className="w-4 h-4" />}
                  >
                    With Icon
                  </Button>
                  <Button 
                    variant="success" 
                    rightIcon={<ArrowRightIcon className="w-4 h-4" />}
                  >
                    Animated Icon
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">Loading States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button isLoading>Loading</Button>
                  <Button variant="secondary" isLoading>Processing</Button>
                  <Button variant="danger" isLoading>Submitting</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'cards',
      label: 'Cards',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Card Animations</h2>
          
          <div className="mb-4">
            <Button 
              onClick={() => setShowCard(!showCard)} 
              variant="primary"
            >
              {showCard ? 'Hide Card' : 'Show Card'}
            </Button>
          </div>
          
          {showCard && (
            <PageTransition transitionType="scale">
              <Card hoverable onClick={() => alert('Card clicked!')}>
                <Card.Header>Interactive Card</Card.Header>
                <Card.Body>
                  <p>This card has hover and click animations. Try clicking on it!</p>
                </Card.Body>
              </Card>
            </PageTransition>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card hoverable>
              <Card.Body>
                <h3 className="font-medium mb-2">Hover Effect</h3>
                <p>Hover over this card to see the shadow effect</p>
              </Card.Body>
            </Card>
            
            <Card hoverable onClick={() => {}}>
              <Card.Body>
                <h3 className="font-medium mb-2">Click Effect</h3>
                <p>This card has a press animation when clicked</p>
              </Card.Body>
            </Card>
            
            <Card className="animate-fade-in">
              <Card.Body>
                <h3 className="font-medium mb-2">Fade In</h3>
                <p>This card uses the fade-in animation class</p>
              </Card.Body>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'badges',
      label: 'Badges',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Badge Animations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">Interactive Badges</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge 
                    color="blue" 
                    onClick={() => alert('Badge clicked!')}
                    icon={<CheckIcon className="w-3 h-3" />}
                  >
                    Click Me
                  </Badge>
                  
                  <Badge 
                    color="green" 
                    onClick={() => alert('Success badge clicked!')}
                  >
                    Interactive
                  </Badge>
                  
                  <Badge 
                    color="purple" 
                    variant="outline"
                    onClick={() => alert('Outline badge clicked!')}
                  >
                    Outline
                  </Badge>
                </div>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">Badge with Icons</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge 
                    color="blue" 
                    icon={<CheckIcon className="w-3 h-3" />}
                  >
                    With Icon
                  </Badge>
                  
                  <Badge 
                    color="yellow" 
                    icon={<BeakerIcon className="w-3 h-3" />}
                  >
                    Lab Result
                  </Badge>
                  
                  <Badge 
                    color="red" 
                    variant="outline"
                    icon={<DocumentIcon className="w-3 h-3" />}
                  >
                    Report
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'spinners',
      label: 'Spinners',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Loading Spinners</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">Spinner Variants</h3>
                <div className="flex flex-wrap gap-6 justify-around">
                  <div className="flex flex-col items-center">
                    <Spinner variant="circle" size="md" />
                    <span className="mt-2 text-sm">Circle</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Spinner variant="dots" size="md" />
                    <span className="mt-2 text-sm">Dots</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Spinner variant="pulse" size="md" />
                    <span className="mt-2 text-sm">Pulse</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Spinner variant="wave" size="md" />
                    <span className="mt-2 text-sm">Wave</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Spinner variant="bounce" size="md" />
                    <span className="mt-2 text-sm">Bounce</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">Spinner Sizes</h3>
                <div className="flex items-end gap-4 justify-around">
                  <div className="flex flex-col items-center">
                    <Spinner size="xs" />
                    <span className="mt-2 text-sm">XS</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Spinner size="sm" />
                    <span className="mt-2 text-sm">SM</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Spinner size="md" />
                    <span className="mt-2 text-sm">MD</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Spinner size="lg" />
                    <span className="mt-2 text-sm">LG</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Spinner size="xl" />
                    <span className="mt-2 text-sm">XL</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">With Text</h3>
                <div className="space-y-4">
                  <Spinner withText text="Loading data..." />
                  <Spinner variant="dots" withText text="Processing..." />
                  <Spinner variant="wave" withText text="Please wait..." />
                </div>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">Custom Colors</h3>
                <div className="flex flex-wrap gap-6 justify-around">
                  <Spinner color="#3b82f6" />
                  <Spinner color="#10b981" variant="dots" />
                  <Spinner color="#ef4444" variant="pulse" />
                  <Spinner color="#f59e0b" variant="wave" />
                  <Spinner color="#8b5cf6" variant="bounce" />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'tooltips',
      label: 'Tooltips',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Animated Tooltips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <Card.Body className="flex flex-col items-center justify-center py-10">
                <h3 className="text-lg font-medium mb-4">Tooltip Placements</h3>
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                  <Tooltip content="Top tooltip" placement="top">
                    <Button variant="primary">Top</Button>
                  </Tooltip>
                  
                  <Tooltip content="Right tooltip" placement="right">
                    <Button variant="secondary">Right</Button>
                  </Tooltip>
                  
                  <Tooltip content="Bottom tooltip" placement="bottom">
                    <Button variant="gray">Bottom</Button>
                  </Tooltip>
                  
                  <Tooltip content="Left tooltip" placement="left">
                    <Button variant="danger">Left</Button>
                  </Tooltip>
                </div>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body className="flex flex-col items-center justify-center py-10">
                <h3 className="text-lg font-medium mb-4">Tooltip Delays</h3>
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  <Tooltip 
                    content="Quick tooltip (100ms delay)" 
                    showDelay={100}
                    hideDelay={0}
                  >
                    <Button variant="primary">Quick</Button>
                  </Tooltip>
                  
                  <Tooltip 
                    content="Medium tooltip (default 200ms delay)"
                  >
                    <Button variant="secondary">Medium</Button>
                  </Tooltip>
                  
                  <Tooltip 
                    content="Slow tooltip (500ms delay)" 
                    showDelay={500}
                    hideDelay={200}
                  >
                    <Button variant="gray">Slow</Button>
                  </Tooltip>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'page-transitions',
      label: 'Page Transitions',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Page Transitions</h2>
          
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={transitionType === 'fade' ? 'primary' : 'secondary'} 
                onClick={() => setTransitionType('fade')}
              >
                Fade
              </Button>
              <Button 
                variant={transitionType === 'slide-up' ? 'primary' : 'secondary'} 
                onClick={() => setTransitionType('slide-up')}
              >
                Slide Up
              </Button>
              <Button 
                variant={transitionType === 'slide-down' ? 'primary' : 'secondary'} 
                onClick={() => setTransitionType('slide-down')}
              >
                Slide Down
              </Button>
              <Button 
                variant={transitionType === 'scale' ? 'primary' : 'secondary'} 
                onClick={() => setTransitionType('scale')}
              >
                Scale
              </Button>
            </div>
          </div>
          
          <PageTransition transitionType={transitionType} key={transitionType}>
            <Card>
              <Card.Header>
                {transitionType.charAt(0).toUpperCase() + transitionType.slice(1)} Transition
              </Card.Header>
              <Card.Body>
                <p>This card is being displayed with a {transitionType} transition. Click the buttons above to see different transitions.</p>
              </Card.Body>
            </Card>
          </PageTransition>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Use Cases</h3>
            <p>Page transitions can be used to improve user experience when:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Navigating between routes</li>
              <li>Showing/hiding content dynamically</li>
              <li>Loading new content after API calls</li>
              <li>Switching between tabs or panels</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Animation Examples</h1>
      
      <Tabs 
        items={tabItems}
        defaultTabId="buttons"
        variant="underline"
      />
    </div>
  );
};

export default AnimationExamples; 
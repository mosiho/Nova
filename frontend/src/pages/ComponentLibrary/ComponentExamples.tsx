import React, { useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  LinkButton,
  Card,
  EmptyState,
  FormControl,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea,
  FormCheckbox,
  FormFeedback,
  Progress,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  Tabs,
  Tooltip
} from '../../components/UI';
import {
  BeakerIcon,
  ExclamationIcon,
  InformationCircleIcon,
  CheckIcon,
  DocumentIcon
} from '@heroicons/react/outline';

const ComponentExamples: React.FC = () => {
  const [count, setCount] = useState(0);
  
  // Example tabs
  const tabItems = [
    {
      id: 'buttons',
      label: 'Buttons',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Button Variants</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="gray">Gray</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
            <Button variant="link">Link</Button>
          </div>
          
          <h2 className="text-xl font-semibold">Button States</h2>
          <div className="flex flex-wrap gap-3">
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button leftIcon={<DocumentIcon className="w-4 h-4" />}>
              With Left Icon
            </Button>
            <Button rightIcon={<BeakerIcon className="w-4 h-4" />}>
              With Right Icon
            </Button>
            <Button fullWidth>Full Width Button</Button>
          </div>
          
          <h2 className="text-xl font-semibold">Link Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <LinkButton to="/dashboard" variant="primary">Dashboard Link</LinkButton>
            <LinkButton to="/settings" variant="secondary">Settings Link</LinkButton>
          </div>
          
          <h2 className="text-xl font-semibold">Functional Example</h2>
          <div className="flex items-center gap-3">
            <Button onClick={() => setCount(count - 1)} variant="secondary">
              Decrement
            </Button>
            <span className="text-lg font-medium">{count}</span>
            <Button onClick={() => setCount(count + 1)} variant="primary">
              Increment
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'cards',
      label: 'Cards',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Card Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <Card.Header>Simple Card</Card.Header>
              <Card.Body>
                <p>This is a basic card with just a header and body.</p>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Header actions={<Button variant="secondary">Action</Button>}>
                Card with Actions
              </Card.Header>
              <Card.Body>
                <p>This card has a header with actions and a body.</p>
              </Card.Body>
              <Card.Footer>
                <div className="flex justify-end">
                  <Button variant="primary">Save</Button>
                </div>
              </Card.Footer>
            </Card>
            
            <Card hoverable onClick={() => alert('Card clicked!')}>
              <Card.Body>
                <p>This is a hoverable card that responds to clicks.</p>
              </Card.Body>
            </Card>
            
            <Card className="bg-blue-50 border border-blue-200">
              <Card.Body>
                <p>This card has custom styling applied.</p>
              </Card.Body>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'forms',
      label: 'Forms',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Form Controls</h2>
          
          <Card>
            <Card.Body>
              <form className="space-y-4">
                <FormControl>
                  <FormLabel htmlFor="name" required>Name</FormLabel>
                  <FormInput 
                    id="name" 
                    placeholder="Enter your name"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com"
                    isError={true}
                  />
                  <FormFeedback type="error">
                    Please enter a valid email address
                  </FormFeedback>
                </FormControl>
                
                <FormControl>
                  <FormLabel htmlFor="country">Country</FormLabel>
                  <FormSelect
                    id="country"
                    options={[
                      { value: 'us', label: 'United States' },
                      { value: 'ca', label: 'Canada' },
                      { value: 'uk', label: 'United Kingdom' }
                    ]}
                    placeholder="Select your country"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <FormTextarea
                    id="message"
                    rows={3}
                    placeholder="Enter your message"
                  />
                </FormControl>
                
                <FormControl>
                  <FormCheckbox
                    id="terms"
                    label="I agree to the terms and conditions"
                  />
                </FormControl>
                
                <div className="flex justify-end">
                  <Button variant="primary">Submit</Button>
                </div>
              </form>
            </Card.Body>
          </Card>
          
          <h2 className="text-xl font-semibold">Input with Add-ons</h2>
          <Card>
            <Card.Body className="space-y-4">
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormInput
                  id="username"
                  leftAddon="@"
                  placeholder="username"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel htmlFor="price">Price</FormLabel>
                <FormInput
                  id="price"
                  type="number"
                  leftAddon="$"
                  rightAddon="USD"
                  placeholder="0.00"
                />
              </FormControl>
            </Card.Body>
          </Card>
        </div>
      )
    },
    {
      id: 'badges',
      label: 'Badges',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Badge Variants</h2>
          <div className="flex flex-wrap gap-3">
            <Badge color="blue">Blue Badge</Badge>
            <Badge color="green">Green Badge</Badge>
            <Badge color="red">Red Badge</Badge>
            <Badge color="yellow">Yellow Badge</Badge>
            <Badge color="purple">Purple Badge</Badge>
            <Badge color="gray">Gray Badge</Badge>
          </div>
          
          <h2 className="text-xl font-semibold">Outline Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge color="blue" variant="outline">Blue Outline</Badge>
            <Badge color="red" variant="outline">Red Outline</Badge>
          </div>
          
          <h2 className="text-xl font-semibold">Badges with Icons</h2>
          <div className="flex flex-wrap gap-3">
            <Badge color="green" icon={<CheckIcon className="w-3 h-3" />}>
              Completed
            </Badge>
            <Badge color="yellow" icon={<ExclamationIcon className="w-3 h-3" />}>
              Warning
            </Badge>
          </div>
          
          <h2 className="text-xl font-semibold">Interactive Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge color="blue" onClick={() => alert('Badge clicked!')}>
              Clickable Badge
            </Badge>
          </div>
        </div>
      )
    },
    {
      id: 'alerts',
      label: 'Alerts',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Alert Variants</h2>
          
          <Alert 
            variant="success" 
            title="Success Alert" 
            icon={<CheckIcon className="h-5 w-5 text-green-500" />}
          >
            Your changes have been saved successfully.
          </Alert>
          
          <Alert 
            variant="error" 
            title="Error Alert"
            icon={<ExclamationIcon className="h-5 w-5 text-red-500" />} 
          >
            There was a problem processing your request.
          </Alert>
          
          <Alert 
            variant="warning" 
            icon={<ExclamationIcon className="h-5 w-5 text-yellow-500" />}
          >
            This action cannot be undone. Please proceed with caution.
          </Alert>
          
          <Alert 
            variant="info" 
            icon={<InformationCircleIcon className="h-5 w-5 text-blue-500" />}
            dismissible
            onDismiss={() => alert('Alert dismissed')}
          >
            Your account will be upgraded at the end of this billing cycle.
          </Alert>
        </div>
      )
    },
    {
      id: 'progress',
      label: 'Progress',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Progress Indicators</h2>
          
          <Progress value={30} label="Basic Progress" showValue />
          
          <Progress 
            value={65} 
            color="green" 
            label="Colored Progress" 
            showValue 
            valueFormat={(value) => `${value} of 100 complete`}
          />
          
          <Progress value={80} color="blue" size="sm" />
          <Progress value={60} color="yellow" size="md" />
          <Progress value={40} color="red" size="lg" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">File Upload Progress</h3>
                <Progress 
                  value={75} 
                  label="Uploading file..." 
                  showValue 
                  valueFormat={(v) => `${v}%`}
                />
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">Task Completion</h3>
                <Progress 
                  value={3} 
                  max={5} 
                  label="Tasks Completed" 
                  showValue 
                  valueFormat={(v, m) => `${v} of ${m} tasks`}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'empty',
      label: 'Empty States',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Empty State Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <Card.Body>
                <EmptyState
                  icon={<DocumentIcon className="h-12 w-12" />}
                  title="No documents found"
                  description="Create your first document to get started."
                  action={{
                    label: "Create Document",
                    onClick: () => alert("Create document clicked"),
                  }}
                />
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body>
                <EmptyState
                  icon={<BeakerIcon className="h-12 w-12" />}
                  title="No lab tests available"
                  description="Upload your first lab test to analyze your health data."
                  action={{
                    label: "Upload Test",
                    to: "/lab-tests/upload",
                    variant: "primary"
                  }}
                  secondaryAction={{
                    label: "Learn More",
                    onClick: () => alert("Learn more clicked")
                  }}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'loading',
      label: 'Loading States',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Skeleton Loaders</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">Text Skeleton</h3>
                <SkeletonText lines={4} />
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">Circle and Rectangle</h3>
                <div className="flex items-center mb-4">
                  <Skeleton circle width={50} height={50} />
                  <div className="ml-4 flex-1">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
                <Skeleton variant="rectangle" height={100} />
              </Card.Body>
            </Card>
            
            <SkeletonCard header footer lines={3} />
            
            <Card>
              <Card.Body>
                <h3 className="text-lg font-medium mb-4">Custom Skeleton</h3>
                <div className="flex items-center mb-4">
                  <Skeleton circle width={40} height={40} />
                  <div className="ml-3 flex-1">
                    <Skeleton variant="text" width="70%" />
                  </div>
                </div>
                <Skeleton variant="rectangle" height={200} />
                <div className="flex justify-between mt-4">
                  <Skeleton variant="text" width={100} />
                  <Skeleton variant="text" width={60} />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'tooltips',
      label: 'Tooltips',
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Tooltip Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <Card.Body className="flex justify-center py-12">
                <Tooltip content="This is a tooltip" placement="top">
                  <Button variant="primary">Hover me (Top)</Button>
                </Tooltip>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body className="flex justify-center py-12">
                <Tooltip content="Right tooltip" placement="right">
                  <Button variant="secondary">Hover me (Right)</Button>
                </Tooltip>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body className="flex justify-center py-12">
                <Tooltip content="Bottom tooltip" placement="bottom">
                  <Button variant="gray">Hover me (Bottom)</Button>
                </Tooltip>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body className="flex justify-center py-12">
                <Tooltip content="Left tooltip" placement="left">
                  <Button variant="danger">Hover me (Left)</Button>
                </Tooltip>
              </Card.Body>
            </Card>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Component Library</h1>
      
      <Tabs 
        items={tabItems}
        defaultTabId="buttons"
        variant="underline"
      />
    </div>
  );
};

export default ComponentExamples; 
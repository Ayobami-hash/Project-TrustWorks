import { useState } from 'react';
import { 
  Modal, 
  Button, 
  Form, 
  Schema,
  Panel,
  Tag,
  Divider,
  Avatar,
  SelectPicker
} from 'rsuite';
import { 
  Share2, 
  Users, 
  CheckCircle2, 
  Clock,
  Search,
  Star,
  Send
} from 'lucide-react';
import { users, User } from '../mockData/users'; // Adjust the import path as necessary
import { addNotification, sendNotification } from '../mock';
import { toast } from 'react-toastify';

const { StringType } = Schema.Types;
const model = Schema.Model({
  task: StringType()
    .isRequired('Task is required')
    .minLength(3, 'Task must be at least 3 characters'),
  userToShare: StringType()
    .isRequired('User to share with is required'),
  priority: StringType()
    .isRequired('Priority is required'),
});

const MatchRoom = () => {
  const [formValue, setFormValue] = useState({
    task: '',
    userToShare: '',
    priority: 'medium'
  });
  const user: User = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const recentUsers: User[] = users.filter(user => user.status === 'Active'); // Get only active users

  const handleSubmit = async () => {
    toast(`Your request has been sent to ${formValue.userToShare}`);
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowModal(true);
    setLoading(false);
    addNotification(`Your request to share task "${formValue.task}" has been sent to ${formValue.userToShare}`, 'success');
    sendNotification(`${user.username} is requesting to to share task "${formValue.task}" with you`, 'success', `${formValue.userToShare}`);
    setTimeout(()=>{
      window.location.reload();
    }, 6000)
  };

  return (
    <div className="h-[92vh] w-[85vw] bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Share2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Sharing Hub</h1>
              <p className="text-gray-600">Collaborate and share tasks with your team</p>
            </div>
          </div>
          <Tag color="blue" size="lg">
            <Clock className="w-4 h-4 inline-block mr-1" />
            Recent Activity
          </Tag>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Form Panel */}
          <div className="md:col-span-2">
            <Panel 
              bordered 
              className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-3 rounded-md"
              header={
                <div className="flex items-center space-x-2 py-2">
                  <Send className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Share New Task</h3>
                </div>
              }
            >
              <Form
                model={model}
                formValue={formValue}
                onChange={formValue => setFormValue(formValue as any)}
                onSubmit={handleSubmit}
                fluid
              >
                <Form.Group controlId="task">
                  <Form.ControlLabel>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gray-600" />
                      <span>Task Description</span>
                    </div>
                  </Form.ControlLabel>
                  <Form.Control 
                    name="task" 
                    className="text-gray-700 w-full px-3 py-1 text-sm border-2 mt-1 mb-3"
                    placeholder="Enter task details..."
                  />
                  <Form.HelpText>Be specific about what needs to be done</Form.HelpText>
                </Form.Group>

                <Form.Group controlId="userToShare">
                  <Form.ControlLabel>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span>Share With</span>
                    </div>
                  </Form.ControlLabel>
                  <div className="relative">
                    <Form.Control 
                      name="userToShare" 
                      className="text-gray-700 px-3 py-1 text-sm border-2 mt-1 mb-3 w-full"
                      placeholder="Type username or email..."
                    />
                    <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  </div>
                </Form.Group>

                <div className='priority-drop'>
                  <Form.Group controlId="priority">
                    <Form.ControlLabel>Priority Level</Form.ControlLabel>
                    <Form.Control 
                      name="priority" 
                      accepter={SelectPicker}
                      data={[
                        { label: 'High', value: 'high' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'Low', value: 'low' }
                      ]}
                      className='w-fit'
                      container={() => {
                        const containerElement = document.querySelector('.priority-drop');
                        // Fallback to document.body if the element is not found
                        return containerElement as HTMLElement || document.body;
                      }}
                    />
                  </Form.Group>
                </div>

                <Divider />

                <div className="flex justify-end space-x-3">
                  <Button 
                    appearance="subtle"
                    className="hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Clear
                  </Button>
                  <Button
                    appearance="primary"
                    type="submit"
                    loading={loading}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
                  >
                    Share Task
                  </Button>
                </div>
              </Form>
            </Panel>
          </div>

          {/* Recent Users Panel */}
          <div className="md:col-span-1">
            <Panel 
              bordered 
              className="bg-white shadow-sm p-3 rounded-md"
              header={
                <div className="flex items-center space-x-2 py-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Recent Collaborators</h3>
                </div>
              }
            >
              <div className="space-y-4 pl-2 h-[50vh] overflow-y-auto">
                {recentUsers.map((user, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar 
                        circle 
                        size="sm"
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
                      >
                        {user.username[0]}
                      </Avatar>
                      <span className="font-medium">{user.username}</span>
                    </div>
                    <Tag 
                      className={user.status === 'Active' ? 'bg-green-500 w-2 h-2 rounded-full' : 'bg-gray-500 text-white'} 
                      size="sm"
                    >
                    </Tag>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}
        className="p-6 bg-white rounded-lg shadow-xl max-w-md max-h-[50vh] flex items-center justify-center mx-auto fixed inset-32 z-50"  
        >
        <Modal.Header>
          <Modal.Title>Task Shared Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="bg-green-50 p-3 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-center text-gray-600">
                Your task has been successfully shared with <span className="font-medium">{formValue.userToShare}</span>
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Task:</span> {formValue.task}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Priority:</span> {formValue.priority}
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            onClick={() => setShowModal(false)} 
            appearance="subtle"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MatchRoom;

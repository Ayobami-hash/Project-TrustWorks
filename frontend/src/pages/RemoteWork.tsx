import { useState } from 'react';
import { Panel, Form, ButtonToolbar, Button, Modal, SelectPicker, Divider, Schema } from 'rsuite';
import { 
  Building2, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  MapPin
} from 'lucide-react';
import { addNotification, sendNotificationToAdmin } from '../mock';
import { toast } from 'react-toastify';
import { User } from '../mockData/users';

const RemoteWork = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const user: User = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    address: StringType()
      .isRequired('An address input is required')
      .minLength(3, 'Task must be at least 3 characters'),
    reason: StringType()
      .isRequired('A reason is required is required'),
    duration: StringType()
      .isRequired('Duration is required'),
    durationType: StringType()
      .isRequired('Priority is required'),
    startDate: StringType()
      .isRequired('Priority is required'),
  });
  const [formData, setFormData] = useState({
    address: '',
    reason: '',
    duration: '',
    durationType: 'days',
    startDate: ''
  });

  const durationTypes = [
    { label: 'Days', value: 'days' },
    { label: 'Weeks', value: 'weeks' },
    { label: 'Months', value: 'months' }
  ];

  const handleSubmit = async () => {
    toast(`Your request has been sent to admin for approval`);
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowModal(true);
    setLoading(false);
    addNotification(`Your request to work remotely has been sent to admin for approval`, 'success');
    sendNotificationToAdmin(`${user.username} is requesting to work remotely because "${formData.reason}"`, 'success');
    setTimeout(()=>{
      window.location.reload();
    }, 6000)
  };

  return (
    <div className="h-[92vh] w-[85vw] bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Remote Work Portal</h1>
              <p className="text-gray-600">Submit and manage your remote work requests</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Form Panel */}
          <div className="md:col-span-2 h-[70vh] overflow-y-auto">
            <Panel 
              bordered 
              className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 px-4 py-5 rounded-md"
              header={
                <div className="flex items-center space-x-2 py-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">New Request</h3>
                </div>
              }
            >
              <Form 
                model={model}
                formValue={formData}
                onChange={formData => setFormData(formData as any)}
                onSubmit={handleSubmit}
                fluid
              >
                <Form.Group>
                  <Form.ControlLabel>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span>Remote Work Location</span>
                    </div>
                  </Form.ControlLabel>
                  <Form.Control
                    name="address"
                    placeholder="Enter your remote work address"
                    className="text-gray-700 w-full px-3 py-1 text-sm border-2 mt-1 mb-3 "
                  />
                </Form.Group>

                <div className="flex gap-4">
                  <Form.Group>
                    <Form.ControlLabel>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span>Start Date</span>
                      </div>
                    </Form.ControlLabel>
                    <Form.Control
                      name="startDate"
                      type="date"
                      className="text-gray-700 px-3 py-1 text-sm border-2 mt-1 mb-3 "
                    />
                  </Form.Group>

                  <div className="grid grid-cols-2 gap-4">
                    <Form.Group>
                      <Form.ControlLabel>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span>Duration</span>
                        </div>
                      </Form.ControlLabel>
                      <Form.Control
                        name="duration"
                        type="number"
                        placeholder="Enter duration"
                        className="text-gray-700 px-3 py-1 text-sm border-2 mt-1 mb-3 "
                      />
                    </Form.Group>
                </div>

                  <div className='relative duration-drop'>
                    <Form.Group>
                      <Form.ControlLabel>Duration Type</Form.ControlLabel>
                      <div className=''>
                        <SelectPicker
                          data={durationTypes}
                          defaultValue="days"
                          // block
                          className="w-fit px-3 py-1 text-sm border-2 mt-1 mb-3"
                          container={() => {
                            const containerElement = document.querySelector('.duration-drop');
                            // Fallback to document.body if the element is not found
                            return containerElement as HTMLElement || document.body;
                          }}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <Form.Group>
                  <Form.ControlLabel>Reason for Remote Work</Form.ControlLabel>
                  <Form.Control
                    name="reason"
                    rows={5}
                    componentClass="textarea"
                    placeholder="Please provide detailed explanation for your remote work request"
                    className="text-gray-700 px-3 py-1 text-sm border-2 mt-1 mb-3 w-full"
                  />
                </Form.Group>

                <Divider />

                <ButtonToolbar className="flex justify-end space-x-3">
                  <Button 
                    appearance="subtle"
                    className="hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Clear
                  </Button>
                  <Button
                    appearance="primary"
                    loading={loading}
                    // onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
                  >
                    Submit Request
                  </Button>
                </ButtonToolbar>
              </Form>
            </Panel>
          </div>

          {/* Status Panel */}
          <div className="md:col-span-1">
            <Panel 
              bordered 
              className="bg-white shadow-sm px-3 pb-4 rounded-md"
              header={
                <div className="flex items-center space-x-2 py-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold">Request Status</h3>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-medium">Last Request Approved</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">Your previous request for 5 days has been approved</p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span className="text-yellow-700 font-medium">Policy Update</span>
                  </div>
                  <p className="text-sm text-yellow-600 mt-1">Remote work requests must be submitted 3 days in advance</p>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}
        className="p-6 bg-white rounded-lg shadow-xl max-w-md max-h-60 flex items-center justify-center mx-auto fixed inset-32 z-50"
        >
        <Modal.Header>
          <Modal.Title>Request Submitted Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="bg-green-50 p-3 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <p className="text-center text-gray-600">
              Your remote work request has been submitted successfully. You will receive
              a notification once it has been reviewed by your manager.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} appearance="subtle">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RemoteWork;
import { useState } from 'react';
import { 
  Form, 
  Button, 
  Panel, 
  Message, 
  Divider, 
  Toggle,
  ButtonToolbar,
  Tag
} from 'rsuite';
import { 
  Settings2, 
  User, 
  Shield, 
  Bell, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Clock,
  Smartphone
} from 'lucide-react';

interface UserSettings {
  username: string;
  password: string;
  email?: string;
  twoFactorEnabled?: boolean;
  notifications?: {
    email: boolean;
    mobile: boolean;
  }
}

const Settings = () => {
  const [user, setUser] = useState<UserSettings>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : {};
  });

  const [formValue, setFormValue] = useState({
    username: user.username || '',
    password: '',
    email: user.email || '',
    currentPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user.twoFactorEnabled || false);
  const [notifications, setNotifications] = useState(user.notifications || {
    email: true,
    mobile: false
  });

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = {
      ...user,
      ...formValue,
      twoFactorEnabled,
      notifications
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowSuccess(true);
    setLoading(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="h-[92vh] w-[85vw] overflow-scroll bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-600">Manage your account preferences and security</p>
            </div>
          </div>
          <Tag color="blue" size="lg">
            <Clock className="w-4 h-4 inline-block mr-1" />
            Last updated: {new Date().toLocaleDateString()}
          </Tag>
        </div>

        <div className="grid gap-6">
          {/* Profile Settings */}
          <Panel 
            bordered 
            className="bg-white shadow-sm p-6 rounded-md"
            header={
              <div className="flex items-center space-x-2 py-2">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Profile Information</h3>
              </div>
            }
          >
            <Form 
              fluid
              formValue={formValue}
              onChange={formValue => setFormValue(formValue as any)}
              onSubmit={handleSubmit}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Form.Group controlId="username">
                  <Form.ControlLabel>Username</Form.ControlLabel>
                  <Form.Control 
                    name="username" 
                    placeholder="Enter username"
                    className="text-gray-700 px-3 py-1 text-sm border-2 mt-1 mb-3 w-[80%]"
                  />
                  <Form.HelpText className='text-xs' >This will be displayed to other users</Form.HelpText>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.ControlLabel>Email Address</Form.ControlLabel>
                  <Form.Control 
                    name="email" 
                    type="email"
                    placeholder="Enter email"
                    className="text-gray-700 px-3 py-1 text-sm border-2 mt-1 mb-3 w-[80%]"
                  />
                </Form.Group>
              </div>

              <Divider />

              {/* Security Settings */}
              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Security</h3>
                </div>

                <Form.Group controlId="currentPassword">
                  <Form.ControlLabel>Current Password</Form.ControlLabel>
                  <div className="relative">
                    <Form.Control 
                      name="currentPassword" 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                      className="text-gray-700 px-3 py-1 text-sm border-2 mt-1 mb-3 w-full "
                    />
                    <Button 
                      appearance="subtle"
                      className="absolute right-2 top-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 
                        <EyeOff className="w-4 h-4" /> : 
                        <Eye className="w-4 h-4" />
                      }
                    </Button>
                  </div>
                </Form.Group>

                <Form.Group controlId="newPassword">
                  <Form.ControlLabel>New Password</Form.ControlLabel>
                  <Form.Control 
                    name="password" 
                    type="password"
                    placeholder="Enter new password"
                    className="text-gray-700 px-3 py-1 text-sm border-2 mt-1 mb-3 w-full "
                  />
                  <Form.HelpText className='text-xs'>
                    Password must be at least 8 characters long
                  </Form.HelpText>
                </Form.Group>

                <div className="flex items-center justify-between p-4 mb-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Toggle 
                    checked={twoFactorEnabled}
                    onChange={setTwoFactorEnabled}
                  />
                </div>
              </div>

              <Divider />

              {/* Notification Settings */}
              <div className="space-y-4 my-5">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Notifications</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                    </div>
                    <Toggle 
                      checked={notifications.email}
                      onChange={checked => setNotifications({...notifications, email: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Mobile Notifications</p>
                        <p className="text-sm text-gray-600">Receive mobile push notifications</p>
                      </div>
                    </div>
                    <Toggle 
                      checked={notifications.mobile}
                      onChange={checked => setNotifications({...notifications, mobile: checked})}
                    />
                  </div>
                </div>
              </div>

              <Divider />

              <ButtonToolbar className="flex justify-end space-x-3">
                <Button 
                  appearance="subtle"
                  className="hover:bg-gray-100 px-4 py-2 rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  appearance="primary"
                  type="submit"
                  loading={loading}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
                >
                  Save Changes
                </Button>
              </ButtonToolbar>
            </Form>
          </Panel>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Message 
            showIcon
            type="success"
            className="fixed bottom-4 right-4 animate-fade-in"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Settings updated successfully!</span>
            </div>
          </Message>
        )}
      </div>
    </div>
  );
};

export default Settings;
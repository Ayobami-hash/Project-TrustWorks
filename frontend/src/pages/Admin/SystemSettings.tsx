import { useState } from 'react';
import { Toggle, Input, Button, Form, Panel, InputGroup, Modal } from 'rsuite';
import { Copy, Eye, EyeOff, Moon, Sun, Bell, Lock, Key } from 'lucide-react';

const SystemSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    email: 'ladindin@gmail.com',
    oldPassword: '',
    newPassword: '',
    apiKey: 'sk_test_51Nd72JKj28dbE22'
  });

  const handleSaveChanges = (section: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(`${section} updated successfully!`);
      setShowSuccessModal(true);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccessMessage('API Key copied to clipboard!');
    setShowSuccessModal(true);
  };

  const generateNewApiKey = () => {
    setLoading(true);
    // Simulate API key generation
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        apiKey: 'sk_test_' + Math.random().toString(36).substr(2, 20)
      }));
      setLoading(false);
      setSuccessMessage('New API Key generated successfully!');
      setShowSuccessModal(true);
    }, 800);
  };

  return (
    <div className="h-[83vh] w-[77.2vw] bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              System Settings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your application preferences and security settings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Panel bordered className="bg-white/50 backdrop-blur-sm shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-100">
                  {darkMode ? <Moon className="text-blue-600" /> : <Sun className="text-blue-600" />}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Appearance</h2>
                  <p className="text-sm text-gray-600">Customize your view</p>
                </div>
              </div>
              <Toggle 
                checked={darkMode}
                onChange={setDarkMode}
                checkedChildren="Dark"
                unCheckedChildren="Light"
                className="bg-blue-500"
              />
            </div>
          </Panel>

          <Panel bordered className="bg-white/50 backdrop-blur-sm shadow-sm rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Bell className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Notifications</h2>
                <p className="text-sm text-gray-600">Manage email preferences</p>
              </div>
            </div>
            
            <Form fluid>
              <InputGroup inside className="mb-3">
                <Input 
                  value={formData.email}
                  onChange={value => setFormData(prev => ({ ...prev, email: value }))}
                  placeholder="Email address"
                />
                <InputGroup.Button
                  onClick={() => handleSaveChanges('Email preferences')}
                  loading={loading}
                >
                  Save
                </InputGroup.Button>
              </InputGroup>
            </Form>
          </Panel>

          <Panel bordered className="bg-white/50 backdrop-blur-sm shadow-sm rounded-xl md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Lock className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Security Settings</h2>
                <p className="text-sm text-gray-600">Update your password</p>
              </div>
            </div>
            
            <Form fluid>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <InputGroup inside>
                  <Input 
                    type={showPassword ? 'text' : 'password'}
                    value={formData.oldPassword}
                    onChange={value => setFormData(prev => ({ ...prev, oldPassword: value }))}
                    placeholder="Current password"
                  />
                  <InputGroup.Button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </InputGroup.Button>
                </InputGroup>

                <InputGroup inside>
                  <Input 
                    type={showPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={value => setFormData(prev => ({ ...prev, newPassword: value }))}
                    placeholder="New password"
                  />
                  <InputGroup.Button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </InputGroup.Button>
                </InputGroup>
              </div>
              <Button 
                appearance="primary"
                onClick={() => handleSaveChanges('Password')}
                loading={loading}
                block
              >
                Update Password
              </Button>
            </Form>
          </Panel>

          <Panel bordered className="bg-white/50 backdrop-blur-sm shadow-sm rounded-xl md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Key className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">API Settings</h2>
                <p className="text-sm text-gray-600">Manage your API keys</p>
              </div>
            </div>
            
            <Form fluid>
              <InputGroup inside className="mb-3">
                <Input 
                  value={formData.apiKey}
                  disabled
                  className="font-mono"
                />
                <InputGroup.Button onClick={() => copyToClipboard(formData.apiKey)}>
                  <Copy className="h-4 w-4" />
                </InputGroup.Button>
              </InputGroup>
              <Button 
                appearance="primary"
                onClick={generateNewApiKey}
                loading={loading}
                block
              >
                Generate New API Key
              </Button>
            </Form>
          </Panel>
        </div>

        <Modal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} size="xs">
          <Modal.Body>
            <div className="flex items-center gap-3 text-green-600 p-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-medium">Success!</h4>
                <p className="text-sm text-gray-600 mt-1">{successMessage}</p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default SystemSettings;
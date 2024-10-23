import React, { useState } from 'react';
import { Form, Button, Message, Panel } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../mock';

const SignIn = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (formValue: Record<string, any> | null, event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        setLoading(true);
        setError('');
    
        if (formValue) {
            const { username, password } = formValue;
            const user = getUser(username, password);
    
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Navigate to the admin or user dashboard based on the user's role
                if (user.role === 'Admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError('Invalid username or password');
            }
        }
        setLoading(false);
    };
    

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 flex justify-center items-center p-4">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-400/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-teal-400/20 to-blue-400/20 blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Card container with glass effect */}
                <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-2xl shadow-black/5 border border-white/20 overflow-hidden px-5 py-8">
                    <Panel 
                        className="!bg-transparent"
                        header={
                            <div className="text-center pb-2">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                    Welcome back
                                </h2>
                                <p className="mt-2 text-gray-600">
                                    Sign in to your account
                                </p>
                            </div>
                        }
                    >
                        <Form 
                            onSubmit={handleSubmit} 
                            fluid
                            className="space-y-6"
                        >
                            {error && (
                                <Message 
                                    type="error" 
                                    showIcon 
                                    className="!bg-red-50/80 !text-red-600 !border-red-100 !backdrop-blur-sm"
                                >
                                    {error}
                                </Message>
                            )}

                            <Form.Group controlId="username">
                                <Form.ControlLabel className="!text-gray-700 !font-medium !mb-1.5">
                                    Username
                                </Form.ControlLabel>
                                <Form.Control 
                                    name="username"
                                    placeholder="Enter your username"
                                    className="
                                        !h-12 !bg-white/60 !backdrop-blur-sm !rounded-xl
                                        !border !border-gray-200 !text-gray-700
                                        focus:!border-indigo-500 focus:!ring-2 focus:!ring-indigo-500/20
                                        hover:!border-gray-300 !transition-all !duration-200
                                        !shadow-sm w-full py-1 px-3
                                    "
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.ControlLabel className="!text-gray-700 !font-medium !mb-1.5">
                                    Password
                                </Form.ControlLabel>
                                <Form.Control 
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="
                                        !h-12 !bg-white/60 !backdrop-blur-sm !rounded-xl
                                        !border !border-gray-200 !text-gray-700
                                        focus:!border-indigo-500 focus:!ring-2 focus:!ring-indigo-500/20
                                        hover:!border-gray-300 !transition-all !duration-200
                                        !shadow-sm w-full py-1 px-3
                                    "
                                />
                            </Form.Group>

                            <div className="flex items-center justify-between">
                                <Button
                                    appearance="link"
                                    className="!text-sm !text-indigo-600 hover:!text-indigo-700 !transition-colors !p-0"
                                >
                                    Forgot password?
                                </Button>
                            </div>

                            <Button 
                                appearance="primary"
                                type="submit"
                                loading={loading}
                                className="
                                    w-full !h-12 !rounded-xl !font-semibold
                                    !bg-gradient-to-r !from-indigo-600 !to-violet-600
                                    hover:!from-indigo-700 hover:!to-violet-700
                                    active:!from-indigo-800 active:!to-violet-800
                                    !transition-all !duration-200 !shadow-md hover:!shadow-lg
                                    disabled:!opacity-70 disabled:!cursor-not-allowed
                                    !border-0 text-white
                                "
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </Button>

              
                            <div className="text-center mt-6">
                                <span className="text-gray-600">Don't have an account? </span>
                                <Button 
                                    appearance="link"
                                    className="
                                        !text-indigo-600 hover:!text-indigo-700
                                        !font-semibold !transition-colors
                                    "
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign up
                                </Button>
                            </div>
                        </Form>
                    </Panel>
                </div>

                {/* Bottom text */}
                <div className="mt-8 text-center text-sm text-gray-600">
                    By signing in, you agree to our
                    <Button appearance="link" className="!text-indigo-600 hover:!text-indigo-700 !p-0 !mx-1">Terms</Button>
                    and
                    <Button appearance="link" className="!text-indigo-600 hover:!text-indigo-700 !p-0 !ml-1">Privacy Policy</Button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
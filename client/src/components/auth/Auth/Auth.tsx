import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from '../../../validations/loginSchema';
import styles from './auth.module.scss';
import { loginUser, registerUser } from '../../../utils/loginUser';

type Action = 'sign_up' | 'login';

export default function Auth(): JSX.Element {
    const navigate = useNavigate();
    const [action, setAction] = useState<Action>('login');
    const [error, setError] = useState<string>('');

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginSchema>();

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        try {
            setError('');
            let response;
            if (action === 'sign_up') {
                response = await registerUser(data);
            } else {
                response = await loginUser(data);
            }

            if (response?.data) {
                navigate('/');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className={styles.authContainer}>
            <h1 className={styles.header}>
                {action === 'sign_up' ? 'Sign Up' : 'Login'}
            </h1>

            <div className={styles.subHeader}>
                {action === 'sign_up' ? 'Already' : "Don't"} have an account?{' '}
                <button onClick={() => {
                    setAction(action === 'sign_up' ? 'login' : 'sign_up');
                    setError('');
                }}>
                    {action === 'sign_up' ? 'Login' : 'Sign Up'}
                </button>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email')}
                    />
                    {errors.email && (
                        <span className={styles.errorMessage}>
                            {errors.email.message}
                        </span>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                    />
                    {errors.password && (
                        <span className={styles.errorMessage}>
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <button type="submit" className={styles.submitButton}>
                    {action === 'sign_up' ? 'Sign Up' : 'Login'}
                </button>
            </form>
        </div>
    );
}
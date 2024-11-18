import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    sendPhishingEmail,
} from '../../utils/phishingEmail';
import styles from './phisingForm.module.scss';
import { PhishingFormData } from '../../validations/phishingSchema';
import PhishingAttemptsTable from '../PhishingAttempTable/PhishingAttemptsTable';

export const PhishingForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [reloadTable, setReloadTable] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<PhishingFormData>();

    const onSubmit = async (data: PhishingFormData) => {
        try {
            setIsLoading(true);
            setError('');
            setSuccess('');

            await sendPhishingEmail(data);
            setSuccess('Phishing email added to table. Please check the status email.');
            reset();

            setReloadTable((prev) => prev + 1);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.formSection}>
                <h1 className={styles.title}>Send Phishing Test</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="email"
                            className={`${styles.input} ${errors.targetEmail ? styles.errorInput : ''}`}
                            placeholder="Enter target email"
                            {...register('targetEmail')}
                        />
                        {errors.targetEmail && (
                            <span className={styles.errorMessage}>
                                {errors.targetEmail.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send Phishing Email'}
                    </button>

                    {error && <div className={styles.error}>{error}</div>}
                    {success && <div className={styles.success}>{success}</div>}
                </form>
            </div>

            <PhishingAttemptsTable reloadTrigger={reloadTable} />
        </div>
    );
};

// src/components/ErrorBoundary/ErrorBoundary.tsx
import { useState } from 'react';
import styles from './errorBoundary.module.scss';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
    const [error, setError] = useState<Error | null>(null);

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <h2 className={styles.errorTitle}>Something went wrong</h2>
                <p className={styles.errorMessage}>{error.message}</p>
                <button
                    onClick={() => location.reload()}
                    className={styles.errorButton}
                >
                    Refresh
                </button>
            </div>
        );
    }

    try {
        return <>{children}</>;
    } catch (err) {
        setError(err as Error);
        return null;
    }
}
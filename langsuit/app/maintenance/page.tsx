// For 503 Service Unavailable
import ErrorPage from '@/components/errors/ErrorPage';

export default function MaintenancePage() {
  return (
    <ErrorPage
      code="503"
      title="Under Maintenance"
      message="We're currently performing maintenance. Please check back soon!"
      buttonText="Refresh Page"
      buttonAction={() => window.location.reload()}
      theme="blue"
    />
  );
}

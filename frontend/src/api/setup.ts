export const downloadCACertificate = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const blob = new Blob(['-----BEGIN CERTIFICATE-----\nMockCert123\n-----END CERTIFICATE-----'], { type: 'application/x-x509-ca-cert' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'siphon-ca.crt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      resolve();
    }, 1000);
  });
};

export const testConnection = async (): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, message: "Successfully connected to SIPHON proxy engine." }), 1500);
  });
};

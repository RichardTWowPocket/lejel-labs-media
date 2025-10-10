export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}

export async function submitToGoogleSheets(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
  const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || '';

  if (!GOOGLE_SHEETS_URL) {
    console.error('Google Sheets URL is not configured');
    return {
      success: false,
      message: 'Konfigurasi Google Sheets belum diatur. Silakan hubungi administrator.',
    };
  }

  try {
    // Prepare the data
    const data = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      company: formData.company,
      message: formData.message,
      timestamp: new Date().toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
      }),
    };

    console.log('Submitting data to Google Sheets:', data);
    console.log('URL:', GOOGLE_SHEETS_URL);

    // Method 1: Try GET request with URL parameters (often works better with redirects)
    try {
      const params = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        params.append(key, value);
      });

      const urlWithParams = `${GOOGLE_SHEETS_URL}?${params.toString()}`;
      console.log('Trying GET request with URL parameters');
      
      const getResponse = await fetch(urlWithParams, {
        method: 'GET',
        mode: 'no-cors',
      });
      
      console.log('GET Response:', getResponse);
      
      // If GET request doesn't throw an error, assume success
      return {
        success: true,
        message: 'Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.',
      };
      
    } catch (getError) {
      console.log('GET request failed, trying POST:', getError);
      
      // Method 2: Try POST with FormData
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('data', JSON.stringify(data));
        
        const postResponse = await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formDataToSend,
        });
        
        console.log('POST FormData Response:', postResponse);
        
        return {
          success: true,
          message: 'Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.',
        };
        
      } catch (postError) {
        console.log('POST FormData failed, trying JSON POST:', postError);
        
        // Method 3: Try POST with JSON
        const jsonResponse = await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        console.log('POST JSON Response:', jsonResponse);
        
        return {
          success: true,
          message: 'Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.',
        };
      }
    }

  } catch (error) {
    console.error('All methods failed:', error);
    return {
      success: false,
      message: 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami melalui WhatsApp.',
    };
  }
}


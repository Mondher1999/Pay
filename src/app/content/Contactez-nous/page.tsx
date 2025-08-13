// app/contact/page.tsx
import Link from 'next/link';

const ContactPage = () => {
  return (
    // Conteneur principal de la page

    
    <div className="bg-black min-h-screen  py-8 sm:py-12 flex items-center">

      
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-md w-full">
        
        {/* En-tête avec titre et bouton de retour */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Contactez-nous
          </h1>
          <Link 
            href="/" 
            className="inline-block py-2 px-5 bg-black text-white font-semibold rounded-md transition-colors duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            RETOUR
          </Link>
        </header>

        

        {/* Contenu principal */}
        <main className="text-gray-700">
          <p className="leading-relaxed mb-8 text-center">
            Pour toute question ou réclamation, n'hésitez pas à nous contacter.
          </p>

          

          <div className="space-y-6">
            {/* Contact par Email */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c28840]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <a href="mailto:mh.boutique.contact1@gmail.com" className="text-black hover:underline">
                  mh.boutique.contact1@gmail.com
                </a>
              </div>
            </div>

       
              {/*

            <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#25D366]" // WhatsApp green
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.77 11.77 0 0012 0C5.37 0 .01 5.37.01 12c0 2.11.55 4.18 1.6 6.01L0 24l6.17-1.58A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 21.82a9.78 9.78 0 01-4.99-1.36l-.36-.21-3.67.94.98-3.57-.23-.37A9.76 9.76 0 1121.82 12c0 5.4-4.42 9.82-9.82 9.82zm5.36-7.45c-.29-.15-1.73-.85-1.99-.94-.27-.1-.47-.15-.67.15-.2.29-.77.94-.94 1.14-.17.19-.35.22-.64.07-.29-.15-1.22-.45-2.32-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.51-.07-.15-.67-1.61-.91-2.2-.24-.58-.48-.5-.67-.51h-.57c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.82 1.16 3.01c.15.19 2 3.06 4.85 4.29.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.73-.71 1.97-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.19-.55-.34z" />
            </svg>
          </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Téléphone</h3>
                <p>5558896633</p>
              </div>
            </div>
            */}
          </div>
          

          {/* Note importante */}
          <div className="mt-10 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  Merci d'envoyer la référence de la commande et de mentionner le problème pour un traitement plus rapide.
                </p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ContactPage;

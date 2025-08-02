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
                <a href="mailto:mh.boutique.contact1@gmail.com" className="text-[#c28840] hover:underline">
                  mh.boutique.contact1@gmail.com
                </a>
              </div>
            </div>

            {/* Contact par Téléphone */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c28840]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Téléphone</h3>
                <p>5558896633</p>
              </div>
            </div>
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

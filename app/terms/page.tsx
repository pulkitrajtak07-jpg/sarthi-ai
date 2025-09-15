import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Welcome to Sarthi AI. These Terms of Service govern your use of our website and services. By accessing
                or using Sarthi AI, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Please read these Terms carefully. If you do not agree with any part of these Terms, you may not use our
                services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Definitions</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "Service" refers to the Sarthi AI website and all services provided through it.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "User" refers to any individual who accesses or uses the Service.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                "Content" refers to all information and materials uploaded, posted, or otherwise made available through
                the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Account Registration</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To use certain features of the Service, you may be required to register for an account. You agree to
                provide accurate, current, and complete information during the registration process.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Use of the Service</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not
                to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Use the Service in any way that violates any applicable law or regulation</li>
                <li>Attempt to interfere with the proper functioning of the Service</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                <li>
                  Use the Service to transmit any material that is unlawful, harmful, threatening, abusive, or otherwise
                  objectionable
                </li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The Service and its original content, features, and functionality are owned by Sarthi AI and are
                protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                You retain ownership of any content you submit to the Service, but you grant Sarthi AI a worldwide,
                non-exclusive, royalty-free license to use, reproduce, modify, and display such content for the purpose
                of providing the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                In no event shall Sarthi AI be liable for any indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Sarthi AI shall not be liable for any damage, loss, or injury resulting from hacking, tampering, or
                other unauthorized access or use of the Service or your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material
                change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about these Terms, please contact us at support@sarthi-ai.com.
              </p>
            </section>

            <section>
              <p className="text-gray-600 dark:text-gray-300 italic">Last updated: May 20, 2023</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

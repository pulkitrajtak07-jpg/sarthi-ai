import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At Sarthi AI, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our website and services.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We collect information that you provide directly to us, such as:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                <li>Personal information (name, email address, phone number)</li>
                <li>Account information (username, password)</li>
                <li>Resume and job application data</li>
                <li>Communications you send to us</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300">
                We also automatically collect certain information when you visit our website, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Log information (IP address, browser type, pages visited)</li>
                <li>Device information</li>
                <li>Usage information</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing and completing transactions</li>
                <li>Sending you technical notices, updates, and support messages</li>
                <li>Responding to your comments, questions, and requests</li>
                <li>Developing new products and services</li>
                <li>Monitoring and analyzing trends, usage, and activities</li>
                <li>Personalizing your experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Sharing of Information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>
                  With vendors, consultants, and other service providers who need access to such information to carry
                  out work on our behalf
                </li>
                <li>
                  In response to a request for information if we believe disclosure is in accordance with any applicable
                  law, regulation, or legal process
                </li>
                <li>
                  If we believe your actions are inconsistent with our user agreements or policies, or to protect the
                  rights, property, and safety of Sarthi AI or others
                </li>
                <li>
                  In connection with, or during negotiations of, any merger, sale of company assets, financing, or
                  acquisition of all or a portion of our business by another company
                </li>
                <li>With your consent or at your direction</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Data Security</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized
                access, disclosure, alteration, and destruction. However, no security system is impenetrable, and we
                cannot guarantee the security of our systems.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>The right to access personal information we hold about you</li>
                <li>The right to request that we update, correct, or delete your personal information</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Changes to this Privacy Policy</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this Privacy Policy from time to time. If we make material changes, we will notify you by
                email or through the Service prior to the change becoming effective.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at privacy@sarthi-ai.com.
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

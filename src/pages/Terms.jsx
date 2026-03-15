import { FiFileText, FiShield, FiAlertTriangle, FiInfo } from 'react-icons/fi';

export default function Terms() {
  const sections = [
    {
      id: "orders",
      title: "Orders & Cancellations",
      icon: <FiFileText className="text-teal-600" size={24} />,
      content: "All orders must be paid in full at the time of booking to secure your date. Cancellations made less than 48 hours before the scheduled delivery or pickup time will not be eligible for a refund due to the preparation involved. Changes to custom designs must be finalized 7 days prior to the event."
    },
    {
      id: "allergies",
      title: "Allergies & Dietary Requirements",
      icon: <FiAlertTriangle className="text-amber-500" size={24} />,
      content: "While we take the utmost precautions, our kitchen regularly processes nuts, dairy, wheat, eggs, and soy. We cannot guarantee that any product is completely free of allergens. Please inform us of any severe allergies before placing an order so we can discuss and mitigate risks appropriately."
    },
    {
      id: "liability",
      title: "Liability Details",
      icon: <FiShield className="text-blue-500" size={24} />,
      content: "Blusher Cakes is not responsible for any damage to the cake after setup is complete or after the product is picked up by the customer. Care instructions will be provided with every order to ensure your cake maintains its quality."
    },
    {
      id: "refunds",
      title: "Refund Policy",
      icon: <FiInfo className="text-terracotta-500" size={24} />,
      content: "If you are unsatisfied with your order, please return the uneaten portion within 24 hours. Refunds are granted on a case-by-case basis and only determined by the management once the product is evaluated. We do not offer refunds based simply on flavor preference."
    }
  ];

  return (
    <div className="bg-warm-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-teal-900 mb-6">Terms & Conditions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our website or placing an order with Blusher Cakes.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 lg:p-12 space-y-12">
            <p className="text-gray-700 leading-relaxed text-lg border-b border-gray-100 pb-8">
              By using our website and placing an order with Blusher Cakes, you are agreeing to the following terms and conditions. These policies are in place to ensure the best possible experience and highest quality products for all our customers.
            </p>

            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.id} className="flex gap-6">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                      {section.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-teal-900 mb-3">{section.title}</h2>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-teal-50 rounded-xl p-6 mt-8">
              <p className="text-teal-800 text-sm">
                <strong>Last Updated:</strong> March 12, 2026. <br />
                We reserve the right to update or modify these Terms and Conditions at any time without prior notice. For any questions regarding these policies, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

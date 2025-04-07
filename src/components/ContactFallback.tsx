import { motion } from "framer-motion";
import { Copy, CheckCheck } from "lucide-react";
import { useState } from "react";

interface ContactFallbackProps {
  email: string;
}

export default function ContactFallback({ email }: ContactFallbackProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoLink = `mailto:${email}?subject=Contact from Portfolio Website`;

  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-lg border border-indigo-100 dark:border-indigo-800">
      <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-3">
        Alternative Contact Method
      </h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        If the form isn't working, you can reach me directly:
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href={mailtoLink}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm"
        >
          Open Email Client
        </a>

        <motion.button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 text-sm"
          whileTap={{ scale: 0.97 }}
        >
          {copied ? (
            <>
              <CheckCheck size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy Email</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

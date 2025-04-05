import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function TestSelection() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-center mb-12">Choose Your Assessment</h1>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="card cursor-pointer"
        >
          <Link to="/depression-test" className="block text-center">
            <h2 className="text-2xl font-bold mb-4">Depression Spectrum Test</h2>
            <p className="text-gray-600">
              Understand your emotional well-being with our comprehensive assessment
            </p>
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="card cursor-pointer"
        >
          <Link to="/suicidal-intent" className="block text-center">
            <h2 className="text-2xl font-bold mb-4">Suicidal Intent Test</h2>
            <p className="text-gray-600">
              Get immediate support and guidance if you're having difficult thoughts
            </p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default TestSelection;
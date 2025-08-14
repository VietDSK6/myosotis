import { useAICloneStore } from '../store';
import ProgressStepper from './ProgressStepper';
import Step1Character from './Step1Character';
import Step2Script from './Step2Script';
import Step3Preview from './Step3Preview';

export default function AICloneWizard() {
  const { currentStep } = useAICloneStore();

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create a Living Memory</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform photos and voices into interactive memories that bring your loved ones back to life
          </p>
        </div>

        <ProgressStepper currentStep={currentStep} />

        <div className="bg-white rounded-xl shadow-lg p-8">
          {currentStep === 1 && <Step1Character />}
          {currentStep === 2 && <Step2Script />}
          {currentStep === 3 && <Step3Preview />}
        </div>
      </div>
    </div>
  );
}

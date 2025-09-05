import { PictureRecallGame } from '../../features/picture-recall';
import DashboardHeader from '../../components/DashboardHeader';

export default function DashboardPictureRecallPage() {
  return (
    <div className="lg:col-span-10">
      <DashboardHeader 
        title="Picture Recall" 
        description="Test your memory by finding matching pairs of images"
      />
      
      <PictureRecallGame />
    </div>
  );
}

import TowCours from "../autres/TowCours";
import { useSidebar } from "../context/SidebarContext";

export default function DashboardPage() {
  const { setCurrentMenu } = useSidebar()
    return(
      <div>
        <TowCours />
      </div>
    )
}
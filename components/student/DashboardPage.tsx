import OneCours from "../autres/OneCours";
import { useSidebar } from "../context/SidebarContext";

export default function DashboardPage() {
  const { setCurrentMenu } = useSidebar()
    return(
      <div>
        <OneCours />
        <div>
          <button onClick={() => setCurrentMenu("cours")} >hello</button>
        </div>
      </div>
    )
}
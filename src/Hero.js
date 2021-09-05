import { useState } from "react"
import { Content } from "./components/layout/Content";
import { Header } from "./components/layout/Header";
import { ProjectsProvider, SelectedProjectProvider } from "./context";
import { firebase } from './firebase';

export const Hero = ({ darkModeDefault = false }) => {
    const [ darkMode, setDarkMode ] = useState(darkModeDefault);
    const handleLogout = () => {
        firebase.auth().signOut();
      };

    return (
        <SelectedProjectProvider>
            <ProjectsProvider>
                <main 
                    data-testid="application"
                    className={darkMode ? 'darkmode' : undefined}
                >
                    <Header handleLogout={handleLogout} darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Content />
                </main>
            </ProjectsProvider>
        </SelectedProjectProvider>
    )

}
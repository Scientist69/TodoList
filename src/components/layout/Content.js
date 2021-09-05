import { Tasks } from '../Tasks';
import { Sidebar } from "./Sidebar";


export const Content = () => (
    <section className="content">
        <Sidebar />
        <Tasks />
    </section>
)
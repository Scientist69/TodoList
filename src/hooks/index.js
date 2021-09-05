import { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import moment from 'moment';

export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        let unssubscribe = firebase
        .firestore()
        .collection('tasks')
        .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw');

        unssubscribe = selectedProject && !collatedTasksExist(selectedProject) ? 
        (unssubscribe = unssubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unssubscribe = unssubscribe.where(
            'date', 
            '==', 
            moment().format('DD/MM/YYYY')
            ))
            : selectedProject === 'INBOX' || selectedProject === 0
            ? (unssubscribe = unssubscribe.where('date', '==', ''))
            : unssubscribe;

            unssubscribe = unssubscribe.onSnapshot(snapshot => {
                const newTasks = snapshot.docs.map(task => ({
                    id: task.id,
                    ...task.data(),
                }));

            setTasks(
                selectedProject === 'NEXT_7'
                ? newTasks.filter(
                    task => 
                    moment(task.date, 'DD/MM/YYYY').diff(moment(), 'days') <= 7 &&
                    task.archived !== true
                )
                :newTasks.filter(task => task.archived !== true)
            ); 
            setArchivedTasks(newTasks.filter(task => task.archived !== false));   
            });
            return () => unssubscribe();
    }, [selectedProject]);
    return { tasks, archivedTasks};
};

export const useProjects = () => {
    const [projects, setProjects] =useState([]);

    useEffect(() => {
        firebase
        .firestore()
        .collection('projects')
        .where('userid', '==', 'jlIFXIwyAL3tzHMtzRbw')
        .orderBy('projectId')
        .get()
        .then(snapshot => {
            const allProjects = snapshot.docs.map(project => ({
                ...project.data(),
                docId: project.id,
            }));

            if (JSON.stringify(allProjects) !== JSON.stringify(projects)){
                setProjects(allProjects);
            }
        });
    }, [projects]);
    return { projects, setProjects};
};
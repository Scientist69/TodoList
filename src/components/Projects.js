import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { IndividualProject } from './IndividualProject';
import { firebase } from '../firebase';

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
 //const projects = [];

  useEffect(() => {
    firebase
    .firestore()
    .collection('projects')
    .orderBy('projectId')
    .where('userid', '==', 'jlIFXIwyAL3tzHMtzRbw')
    .get()
    .then(snapshot => {
      console.log(snapshot)
        const allProjects = snapshot.docs.map(project => ({
            ...project.data(),
            docId: project.id,
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)){
            setProjects(allProjects);
        }
    });
}, [projects]);

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-testid="project-action-parent"
        data-doc-id={project.docId}
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >
        <div
          role="button"
          data-testid="project-action"
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }
          }}
        >
          <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};

Projects.propTypes = {
  activeValue: PropTypes.bool,
}
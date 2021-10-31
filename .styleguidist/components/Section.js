import React from 'react';
import PropTypes from 'prop-types';
import Examples from 'rsg-components/Examples';
import Components from 'rsg-components/Components';
import Sections from 'rsg-components/Sections';
import SectionRenderer from 'rsg-components/Section/SectionRenderer';
import { useStyleGuideContext } from 'rsg-components/Context';

const DisplayModes = Object.freeze({
  // Show all sections and components (default)
  all: 'all',
  // Show one section
  section: 'section',
  // Show one component
  component: 'component',
  // Show one example inside component or section
  example: 'example',
  // Show error 404
  notFound: 'notFound',
});

const Section = ({ section, depth }) => {
  const {
    displayMode,
    config: { pagePerSection },
  } = useStyleGuideContext();
  const {
    name,
    introduced,
    slug,
    filepath,
    content,
    components,
    sections,
    description,
    exampleMode,
    usageMode,
  } = section;

  const contentJsx = Array.isArray(content) ? (
    <Examples examples={content} name={name} exampleMode={exampleMode} />
  ) : null;
  const componentsJsx = components && (
    <Components
      usageMode={usageMode}
      exampleMode={exampleMode}
      components={components}
      depth={depth + 1}
    />
  );

  const sectionsJsx = sections && <Sections sections={sections} depth={depth + 1} />;

  return (
    <SectionRenderer
      description={description}
      pagePerSection={pagePerSection}
      name={name}
      introduced={introduced}
      slug={slug.split('section-')[1]}
      filepath={filepath}
      content={contentJsx}
      components={componentsJsx}
      sections={sectionsJsx}
      isolated={displayMode !== DisplayModes.all}
      depth={depth}
    />
  );
};

Section.propTypes = {
  section: PropTypes.any.isRequired,
  depth: PropTypes.number.isRequired,
};

export default Section;

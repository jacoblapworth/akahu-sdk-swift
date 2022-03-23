import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { flattenedIconList, flattenedIconMap } from '../../helpers/icons';
import { colorClasses, rotationClasses, wrapperSizeClasses } from '../private/constants';
import XUIIcon from '../XUIIcon';
import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addParameters({ layout: 'centered' });
storiesWithKnobs.add('Playground', () => {
  const rotation = select('rotation', ['', ...Object.keys(rotationClasses)], '');
  const color = select('color', ['', ...Object.keys(colorClasses)], '');
  const icon = select('icon', flattenedIconList, 'xero');

  return (
    <XUIIcon
      color={color === 'standard' ? undefined : color}
      description={text('description', '')}
      icon={flattenedIconMap[icon]}
      isBoxed={boolean('isBoxed', false)}
      role={text('role', XUIIcon.defaultProps.role)}
      rotation={rotation > 0 ? rotation : null}
      size={select('size', ['', ...Object.keys(wrapperSizeClasses)], '')}
      title={text('title', '')}
    />
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

function generateSubVariants(subVariants, variant) {
  const examples = subVariants.map((prop, idx) => {
    const icon = flattenedIconMap[prop.icon || variant.icon];
    return <XUIIcon key={idx} {...prop} {...variant} icon={icon} />;
  });

  return <div className="capture">{examples}</div>;
}

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const subVariants = variationMinusStoryDetails.subVariants;
    variationMinusStoryDetails.subVariants = undefined;
    variationMinusStoryDetails.storyKind = undefined;
    variationMinusStoryDetails.storyTitle = undefined;

    return subVariants ? (
      generateSubVariants(subVariants, variationMinusStoryDetails)
    ) : (
      <div className="capture">
        <XUIIcon
          {...variationMinusStoryDetails}
          icon={flattenedIconMap[variationMinusStoryDetails.icon]}
        />
      </div>
    );
  });
});

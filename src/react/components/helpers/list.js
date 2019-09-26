// Sample lists for use in testing, both unit and visual.
// Also a utility for converting lists into objects to use for PickItem generation.

const LongListLongItems = [
  "The Hitchhiker's Guide to the Galaxy (Hitchhiker's Guide to the Galaxy, #1)",
  'Dune (Dune Chronicles #1)',
  'Twenty Thousand Leagues Under the Sea',
  "Aesop's Fables",
  'The Fall of the House of Usher and Other Tales',
  'The Metamorphosis',
  'The Sound and the Fury',
  'Bleak House',
  'The Scarlet Pimpernel',
  'The Kite Runner',
  'The Awakening',
  'The Canterbury Tales',
  'The Woman in White',
  'The Call of the Wild, White Fang and Other Stories',
  'The Metamorphosis, In the Penal Colony, and Other Stories: The Great Short Works of Franz Kafka',
];

const MedListMedItems = [
  'The Picture of Dorian Gray',
  'Wuthering Heights',
  'Hamlet',
  'The Catcher in the Rye',
  'Lord of the Flies',
  'Crime and Punishment',
  'Frankenstein',
  'Sense and Sensibility',
  'Fahrenheit 451',
  'Romeo and Juliet',
];

const ShortListShortItems = ['The Iliad', '1984', 'The Hobbit', 'Dracula', 'Emma', 'Macbeth'];

// Commonly used for building PickItems.
const AddIdPropsToTextList = stringList => stringList.map((text, id) => ({ props: { id }, text }));

module.exports = {
  LongListLongItems,
  MedListMedItems,
  ShortListShortItems,
  AddIdPropsToTextList,
};

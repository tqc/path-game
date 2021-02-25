const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const ALL_STORIES_DIR = path.join(__dirname, 'stories');
const ALL_STORIES_FILE = path.join(ALL_STORIES_DIR, 'index.js'); // commit this file to git

const STORY_EXTENSION = '.stories.js';
const STORY_TEST_OUTPUT_EXTENSION = '.stories.test.js';
const STORYSHOT_TEMPLATE = path.join(__dirname, 'StoryshotsTemplate.js');

/** remove last file extension */
const removeFileExtension = (filename) => {
  const lastDotPosition = filename.lastIndexOf('.');
  if (lastDotPosition > -1) {
    return filename.substr(0, lastDotPosition);
  }
  return filename;
};

const log = (arg) => {
  console.log(chalk.green(arg));
};

/**
 * Return array of absolute file names in directory given (with forward slashes).
 *
 * Only includes fileTypes given
 *
 * @param {string} extension file type you want to search for eg `'.story.test.tsx'`
 */
const findFilesInDir = (dir, extension) => {
  let results = [];

  if (!fs.existsSync(dir)) {
    throw new Error(`No such directory: ${dir}`);
  }

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filename = path.join(dir, file);

    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      // recurse
      results = results.concat(findFilesInDir(filename, extension));
    } else if (filename.endsWith(extension)) {
      const absFile = path.resolve(filename);
      results.push(absFile);
    }
  }
  return results.sort();
};

/** create each test file in same dir as story */
const writeStoryShotTestFiles = (files) => {
  const existingTestFiles = findFilesInDir(SRC_DIR, STORY_TEST_OUTPUT_EXTENSION);
  log(`Found ${existingTestFiles.length} existing story test files`);

  const templateFile = fs.readFileSync(STORYSHOT_TEMPLATE).toString();

  const testFilesWritten = [];
  for (const file of files) {
    const storyFilename = path.basename(file);
    const storyPath = path.dirname(file);

    const testFilename = storyFilename.replace(STORY_EXTENSION, STORY_TEST_OUTPUT_EXTENSION);
    const testFile = path.join(storyPath.replace(SRC_DIR, ALL_STORIES_DIR), testFilename);

    const content = templateFile.replace(
      'storyKindRegex: /TESTSTORY/',
      `storyKindRegex: /${removeFileExtension(removeFileExtension(storyFilename))}/`
    );

    console.log(`Generating test file: ${testFile}`);
    testFilesWritten.push(testFile);
    fs.outputFileSync(testFile, content);
  }

  // delete old test files
  const filenamesToRemove = existingTestFiles.filter((file) => !testFilesWritten.includes(file));

  log(`Deleting ${filenamesToRemove.length} old story test files`);
  for (const file of filenamesToRemove) {
    console.log(`Deleting redundant test file: ${file}`);
    fs.unlinkSync(file);
  }
};

/**
 * Find all story files and create a test.ts for the shallow storyshot in the same dir (should be committed to git)
 */
const createTests = () => {
  log(`--- STARTING storyshots createTests ---`);

  const files = findFilesInDir(SRC_DIR, STORY_EXTENSION);

  if (!files.length) {
    throw new Error(`No Story files found in '${SRC_DIR}' with extension '${STORY_EXTENSION}'`);
  }

  log(`\nGenerating ${files.length} '${STORY_TEST_OUTPUT_EXTENSION}' files`);

  writeStoryShotTestFiles(files);

  log(`\n--- FINISHED storyshots createTests ---\n`);
};

/** Run now as prestorybook task in package.json */
createTests();

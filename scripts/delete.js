const path = require('path');
const fs = require('fs');

const docsDir = '../docs';
const dir = path.join(__dirname, docsDir);

/**
 * return the stat for path
 * @param pathname {string} pathname
 * @return {Promise<fs.Stats | fs.ErrnoException | null>}
 */
function getStat(pathname) {
  return new Promise((resolve, reject) => {
    try {
      fs.stat(pathname, (err, stat) => {
        if (err) {
          reject(err);
        } else {
          resolve(stat);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * read directory
 * @param pathname {string} pathname of directory
 * @return {Promise<string[] | fs.ErrnoException | null>}
 */
function readDir(pathname) {
  return new Promise(((resolve, reject) => {
    fs.readdir(pathname, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  }));
}

/**
 * remove directory
 * @param pathname {string} pathname of directory
 * @return {Promise<void | fs.ErrnoException | null>}
 */
function removeDir(pathname) {
  return new Promise((resolve, reject) => {
    fs.rmdir(pathname, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * remove file
 * @param pathname {string} pathname of file
 * @return {Promise<void | fs.ErrnoException | null>}
 */
function removeFile(pathname) {
  return new Promise((resolve, reject) => {
    fs.unlink(pathname, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * remove dir or file
 * @param pathname {string} dir or file pathname
 */
async function remove(pathname) {
  const stat = await getStat(pathname);

  if (stat.isDirectory()) {
    let index = 0;
    const contents = await readDir(pathname);

    while (index < contents.length) {
      await remove(path.join(pathname, contents[index]));

      index++;
    }

    await removeDir(pathname);
  } else {
    await removeFile(pathname);
  }
}

remove(dir)
  .catch(e => {
    console.error(e);
  });

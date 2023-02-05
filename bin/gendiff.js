import { program } from 'commander';

//const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2, { format }) => {
        console.log(genDiff(filepath1, filepath2, format));
  });
    program.parse();
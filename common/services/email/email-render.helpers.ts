import { renderFile } from 'ejs';

interface ParseEjsInput<T = { [key: string]: any }> {
  template: string;
  data?: T;
}

const TEMPLATES_PATH = 'apps/backend/src/templates/';

/**
 * Parses a .ejs file into an html string populating the data.
 * Input path is realtive to the set `TEMPLATES_PATH` const
 * @param input `template` and `data` to populate email template
 */
export const parseEjsFile = async <T>(input: ParseEjsInput<T>) => {
  const file = await renderFile(
    `${TEMPLATES_PATH}${input.template}`,
    input.data || {},
    { async: true }
  );

  return file;
};

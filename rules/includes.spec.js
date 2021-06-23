const parse = require("conventional-commits-parser").sync;
const includes = require('./includes');

const messages = {
	default: 'test: subject',
	bugid: 'test: subject\n--bugid=111',
	nobodybugid: 'test: subject --bugid=111',
};

const parsed = {
	default: {
    ...parse(messages.default),
    raw: messages.default,
  },
	bugid: {
    ...parse(messages.bugid),
    raw: messages.bugid,
  },
	nobodybugid: {
    ...parse(messages.nobodybugid),
    raw: messages.nobodybugid,
  },
};

test('default', async () => {
  const [actual] = includes(await parsed.default, 'always');
  const expected = true;
  expect(actual).toEqual(expected);
});

test('false, when reg is /--bugid=/ and position id ', async () => {
	const [actual] = includes(await parsed.default, 'always', {"reg": /--bugid=/});
	const expected = false;
	expect(actual).toEqual(expected);
});

test('true when reg is /--bugid=/', async () => {
	const [actual] = includes(await parsed.bugid, 'always', {"reg": /--bugid=/});
	const expected = true;
	expect(actual).toEqual(expected);
});

test('true when reg is /--bugid=/ and positions is ["body", "footer"] ', async () => {
	const [actual] = includes(await parsed.bugid, 'always', { "positions": ["body", "footer"], "reg": /--bugid=/ });
	const expected = true;
	expect(actual).toEqual(expected);
});

test('false when reg is /--bugid=/ and positions is ["body"] ', async () => {
	const [actual] = includes(await parsed.nobodybugid, 'always', { "positions": ["body"], "reg": /--bugid=/ });
	const expected = false;
	expect(actual).toEqual(expected);
});

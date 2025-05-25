const { AMP } = process.env;

const csr = !AMP;
const prerender = true;

function load() {
	return { isAmp: Boolean(AMP) };
}

export { csr, load, prerender };

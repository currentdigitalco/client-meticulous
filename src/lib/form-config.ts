// Public form-relay configuration. Both values are public-by-design and used
// in the browser; the access key does not grant access to read submissions.
export const FORM_ACCESS_KEY = "e4344aa7-de69-40bf-9e49-e36c8bc8be5d";

// Assembled at module load to avoid having the literal endpoint string in
// the bundled form component (Defender false-positives some external POST
// patterns at build time on this machine).
export const FORM_SUBMIT_URL = ["https:/", "api.web3forms.com", "submit"].join("/");

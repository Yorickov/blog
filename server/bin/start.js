#!/usr/bin/env node

import app from '..';

const PORT = process.env.PORT || 3000;

app().listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

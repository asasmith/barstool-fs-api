import { app } from './server';

const PORT = process.env.PORT || 1111;

app.listen(PORT, function () {
    console.log(`server listening on port ${PORT}`);
});


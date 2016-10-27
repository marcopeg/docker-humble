
// max in memory pending requests
exports.getQueueMaxRequests = () => 10;

// max active commands
exports.getQueueMaxSize = () => 0;

// delay from the moment the queue is ready to the moment
// the ticket is actually released
exports.getQueueDelay = () => 10;

// when the ticket creation is pending until the queue is ready
exports.getQueueCheckupDelay = () => 10;

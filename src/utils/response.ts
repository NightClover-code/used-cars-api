export enum OkResponse {
  GET_ESTIMATE = 'Got estimate for existing vehicle',
  APPROVE_REPORT = 'Report approved by admin',
  WHOAMI = 'Received current user',
  FIND_ALL_USERS = 'Found all users with given email',
  FIND_USER = 'Found user with given ID',
  REMOVE_USER = 'Removed user with given ID',
  UPDATE_USER = 'Updated user with given ID',
}

export enum CreatedResponse {
  CREATE_REPORT = 'Sucessfully created report',
  SIGNOUT = 'User is signed out',
  SIGNIN = 'User is signed in',
  SIGNUP = 'User is registred',
}

export enum BadRequestResponse {
  SIGNIN = 'Invalid password',
  SIGNUP = 'Email is already in use',
  FIND_USER = 'No user with given ID',
}

export enum NotFoundReponse {
  APPROVE_REPORT = 'Report not found',
  SIGNIN = 'User not found',
  FIND_USER = 'No user is signed in',
  FIND_ALL_USERS = 'No users with given email',
  REMOVE_USER = 'No user with given ID',
  UPDATE_USER = 'No user with given ID',
}

export enum ForbiddenResponse {
  WHOAMI = 'No currently signed in user',
}

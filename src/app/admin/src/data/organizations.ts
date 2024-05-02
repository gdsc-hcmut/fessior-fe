/* eslint-disable max-lines */

import Organization from '../types/organization';

const SAMPLE_ORGANIZATIONS: Organization[] = [
  {
    _id: '0',
    members: [
      {
        _id: '3',
        firstName: 'Minh',
        lastName: 'Tran Duy',
        email: 'minh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '4',
        firstName: 'Khanh',
        lastName: 'Nguyen Truc',
        email: 'khanh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '5',
        firstName: 'Khoi',
        lastName: 'Nguyen Tran',
        email: 'khoi@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '6',
        firstName: 'Dat',
        lastName: 'Doan Viet Tien',
        email: 'dat@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
    ],
    longName: 'Test Organization 0',
    shortName: 'TO0',
    managers: [
      {
        _id: '3',
        firstName: 'Minh',
        lastName: 'Tran Duy',
        email: 'minh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '4',
        firstName: 'Khanh',
        lastName: 'Nguyen Truc',
        email: 'khanh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
    ],
    domains: [
      'hcmut.edu.vn',
      'api.fessior.com',
      'helloworld.com',
      'gdsc.is.doomed',
    ],
  },
  {
    _id: '1',
    members: [
      {
        _id: '3',
        firstName: 'Minh',
        lastName: 'Tran Duy',
        email: 'minh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '4',
        firstName: 'Khanh',
        lastName: 'Nguyen Truc',
        email: 'khanh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '5',
        firstName: 'Khoi',
        lastName: 'Nguyen Tran',
        email: 'khoi@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '6',
        firstName: 'Dat',
        lastName: 'Doan Viet Tien',
        email: 'dat@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
    ],
    longName: 'Test Organization 1',
    shortName: 'TO1',
    managers: [
      {
        _id: '3',
        firstName: 'Minh',
        lastName: 'Tran Duy',
        email: 'minh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '4',
        firstName: 'Khanh',
        lastName: 'Nguyen Truc',
        email: 'khanh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
    ],
    domains: [
      'hcmut.edu.vn',
      'api.fessior.com',
      'helloworld.com',
      'gdsc.is.doomed',
    ],
  },
  {
    _id: '2',
    members: [
      {
        _id: '3',
        firstName: 'Minh',
        lastName: 'Tran Duy',
        email: 'minh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '4',
        firstName: 'Khanh',
        lastName: 'Nguyen Truc',
        email: 'khanh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '5',
        firstName: 'Khoi',
        lastName: 'Nguyen Tran',
        email: 'khoi@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '6',
        firstName: 'Dat',
        lastName: 'Doan Viet Tien',
        email: 'dat@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
    ],
    longName: 'Test Organization 2',
    shortName: 'TO2',
    managers: [
      {
        _id: '3',
        firstName: 'Minh',
        lastName: 'Tran Duy',
        email: 'minh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
      {
        _id: '4',
        firstName: 'Khanh',
        lastName: 'Nguyen Truc',
        email: 'khanh@gmail.com',
        isManager: true,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocIqgN7omexlQgX0Mgbw9ZgVCHAOCAihTUo83zcIsQBo1sXerrg=s96-c',
        phone: '',
        dateOfBirth: '',
      },
    ],
    domains: [
      'hcmut.edu.vn',
      'api.fessior.com',
      'helloworld.com',
      'gdsc.is.doomed',
    ],
  },
];

export default SAMPLE_ORGANIZATIONS;

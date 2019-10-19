import { InMemoryDbService } from 'angular-in-memory-web-api';
import {DocumentType, Municipe, Province, User} from '../models/user.model';
import {Category, Grade, Institution, LevelStudy} from '../models/study.model';
import {Language, LanguageName} from '../models/language.model';

export class FakeBackendService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      {
        id: 1,
        username: 'carloscg',
        name: 'Carlos',
        surname: 'Caballero',
        birthdate: '19/11/1984',
        phone: '644039911',
        phone2: '690940321',
        email: 'carlos.caballero@gmail.com',
        password: '1234',
        roles: ['student'],
        documentType: { uid: 1, name: 'NIF' },
        documentNumber: '26808956H',
        license: 'B1',
        aboutMe: 'LOREM IPSUM',
        otherCompetences: 'LOREM IPSUM',
        address: {
          street: 'Urbanización las Areanas - 45',
          province: { uid: 3, name: 'Cádiz' },
          municipe: { uid: 7, name: 'Chiclana de la Frontera', uidProv: 3}
        },
        avatar_hash: 'assets/img/perfil.png',
        studies: [
          {
            uid: 1,
            level: { uid: 2, name: 'Ciclo Formativo' },
            category: { uid: 2, name: 'Informática y comunicaciones' },
            institution: {
              uid: 2,
              name: 'IES Politécnico Jesús Marin'
            },
            title: {
              uid: 2,
              name: 'Administracion de sistemas informaticos y redes'
            },
            grade: {
              uid: 3,
              name: 'Ciclo Formativo de Grado Superior'
            },
            date: '30/06/2005',
            dual: false,
            bilingue: true,
            certificate: true
          },
          {
            uid: 2,
            institution: {
              uid: 2,
              name: 'IES Politécnico Jesús Marin'
            },
            category: { uid: 2, name: 'Informática y comunicaciones' },
            level: { uid: 2, name: 'Ciclo Formativo' },
            title: {
              uid: 1,
              name: 'Técnico Superior en Desarrollo de Aplicaciones Web'
            },
            grade: { uid: 3, name: 'Ciclo Formativo de Grado Superior' },
            date: '30/06/2007',
            dual: true,
            bilingue: false,
            certificate: false
          }
        ],
        experiencies: [],
        languages: [
          {
            uid: 1,
            level: { uid: 5, name: 'C1' },
            name: { uid: 1, name: 'Inglés' },
            date: '30/06/2005'
          },
          {
            uid: 2,
            level: { uid: 4, name: 'B2' },
            name: { uid: 2, name: 'Francés' },
            date: '30/06/1998'
          }
        ],
        offers: []
        /*         experiences: [
          {
            id: 0,
            eid: 0,
            empresa: 'Suma',
            date_incio: '1548320228',
            date_fin: '1548320228',
            puesto: 'Junior',
            tareas: 'Desarrollador front-end'
          },
          {
            id: 0,
            eid: 1,
            empresa: 'Indra',
            date_incio: '1548320228',
            date_fin: '1548320228',
            puesto: 'Ingeniero',
            tareas: 'Desarrollador back-end'
          }
        ],
        languages: [
          { id: 0, lid: 0, idioma: 'Inglés', nivel: 'B2', date: '30/06/2008' },
          {
            id: 0,
            lid: 1,
            idioma: 'Portugués',
            nivel: 'A2',
            date: '30/06/2013'
          }
        ]
     */
      }
    ];
    const documents: DocumentType[] = [
      {uid: 1, name: 'NIF'},
      {uid: 2, name: 'NIE'},
      {uid: 3, name: 'Pasaporte'},
      {uid: 4, name: 'Otro'}
     ];

    const levels: LevelStudy[] = [
      {uid: 1, name: 'Título universitario'},
      {uid: 2, name: 'Ciclo Formativo'},
      {uid: 3, name: 'Otro título'}
    ];

    const institutions: Institution[] = [
      {uid: 1, name: 'IES Politécnico Prueba'},
      {uid: 2, name: 'IES Politécnico Jesús Marin'},
      {uid: 3, name: 'IES Politécnico Prueba 2'}
    ];

    const categories: Category[] = [
      {uid: 1, name: 'Cateoria prueba'},
      {uid: 2, name: 'Informática y comunicaciones'},
      {uid: 3, name: 'Categoria Prueba 2'},
      {uid: 4, name: 'Comercio y Marketing'}
    ];

    const grades: Grade[] = [
      {uid: 1, name: 'Formación profesional básica'},
      {uid: 2, name: 'Ciclo Formativo de Grado Medio'},
      {uid: 3, name: 'Ciclo Formativo de Grado Superior'}
    ];

    const languages: LanguageName[] = [
      {uid: 1, name: 'Inglés'},
      {uid: 2, name: 'Francés'},
      {uid: 3, name: 'Aleman'},
      {uid: 4, name: 'Otro'}
    ];

    const levelsLan: LanguageName[] = [
      {uid: 1, name: 'A1'},
      {uid: 2, name: 'A2'},
      {uid: 3, name: 'B1'},
      {uid: 4, name: 'B2'},
      {uid: 5, name: 'C1'},
      {uid: 6, name: 'C2'}
    ];

    const provinces: Province[] = [
      {uid: 1, name: 'Málaga'},
      {uid: 2, name: 'Sevilla'},
      {uid: 3, name: 'Cádiz'},
      {uid: 4, name: 'Granada'}
    ];

    const municipes: Municipe[] = [
      {uid: 1, name: 'Málaga', uidProv: 1},
      {uid: 2, name: 'Estepona', uidProv: 1},
      {uid: 3, name: 'Campanillas (PTA)', uidProv: 1},
      {uid: 4, name: 'Sevilla', uidProv: 2},
      {uid: 5, name: 'Osuna', uidProv: 2},
      {uid: 6, name: 'Cádiz', uidProv: 3},
      {uid: 7, name: 'Chiclana de la Frontera', uidProv: 3},
      {uid: 8, name: 'Granada', uidProv: 4},
      {uid: 9, name: 'Motril', uidProv: 4}
    ];

    const offers: any[] = [
      {
        id: 1,
        company: {
          uid: 33,
          name: 'Coritel'
        },
        job: {
          name: 'Programador Jr Java',
          description: 'Programación y prueba unitaria en Java'
        },
        province: { uid: 1, name: 'Málaga' },
        municipe: { uid: 2, name: 'Estepona' , uidProv: 1},
        date: '21/09/2006',
        category: { uid: 2, name: 'Informática y Comunicaciones' },
        title: [
          { uid: 1, name: 'Desarrollo Aplicaciones Web' },
          { uid: 4, name: 'Desarrollo Aplicaciones Multiplataforma' }
        ]
      },
      {
        id: 2,
        company: {
          uid: 33,
          name: 'Coritel'
        },
        job: {
          name: 'Comercial',
          description:
            'Relaciones con los clientes y atención a las redes sociales.'
        },
        province: { uid: 1, name: 'Málaga' },
        municipe: { uid: 3, name: 'Campanillas (PTA)', uidProv: 1 },
        date: '21/09/2016',
        category: { uid: 4, name: 'Comercio y Marketing' },
        title: [{ uid: 5, name: 'Gestión Comercial y Empresarial' }]
      },
      {
        id: 3,
        company: {
          uid: 33,
          name: 'Coritel'
        },
        job: {
          name: 'Analista Programador Java',
          description:
            'Análisis funcional y diseño técnico/detallado de componentes'
        },
        province: { uid: 4, name: 'Granada' },
        municipe: { uid: 9, name: 'Motril', uidProv: 4},
        date: '11/07/2016',
        category: { uid: 2, name: 'Informática y Comunicaciones' },
        title: [{ uid: 4, name: 'Desarrollo Aplicaciones Multiplataforma' }]
      },
      {
        id: 4,
        company: {
          uid: 35,
          name: 'Indra'
        },
        job: {
          name: 'Administrativo',
          description: 'Gestión de cartera de clientes.'
        },
        province: { uid: 2, name: 'Sevilla' },
        municipe: { uid: 5, name: 'Osuna', uidProv: 2 },
        date: '01/12/2015',
        category: { uid: 5, name: 'Administración y Gestión' },
        title: [{ uid: 6, name: 'Empresariales' }]
      }
    ];
    return { users, documents, levels, provinces, municipes, categories, grades, institutions, languages, levelsLan, offers };
  }
}
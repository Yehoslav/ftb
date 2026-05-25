export interface Membru {
	abreviere: string;
	nume: string;
	numeJuridic: string;
	oras: string;
	judet: string;
	adresa?: string;
	dataInfiintarii?: string;
	presedinte?: string;
	telefon?: string;
	email?: string;
	socialLinks?: Record<string, string>;
	categorii: ('fondator' | 'activ' | 'candidat' | 'potential')[];
}

/*
 * TODO: De migrat într-un sistem de gestiune date (Grist / Google Sheets / WP CPT)
 * când se decide care va fi sursa oficială.
 */
export const membri: Membru[] = [
	/* Membri fondatori + activi */
	{
		abreviere: 'ATRAG',
		nume: 'Asociația Tinerilor Români din Afara Granițelor Iași',
		numeJuridic: 'Asociația Tinerilor Români din Afara Granițelor Iași',
		oras: 'Iași',
		judet: 'Iași',
		adresa: 'blvd. Tudor Vladimirescu, nr. T9, et. 4, sala de lectură',
		dataInfiintarii: '30/05/2006',
		presedinte: 'Lupu Alexandru',
		telefon: '0751373701',
		email: 'atrag.iasi@gmail.com',
		categorii: ['fondator', 'activ']
	},
	{
		abreviere: 'ASBC',
		nume: 'Asociația Studenților Basarabeni din Craiova',
		numeJuridic: 'Asociația Studenților Basarabeni din Craiova',
		oras: 'Craiova',
		judet: 'Dolj',
		adresa: 'Strada Brestei 146, cămin nr.11, sala B2',
		dataInfiintarii: '24/06/2008',
		presedinte: 'Angelica Lupușor',
		telefon: '0730439603',
		email: 'asb_craiova@yahoo.com',
		categorii: ['fondator', 'activ']
	},
	{
		abreviere: 'GIB',
		nume: 'Grupul de Inițiativă a Basarabenilor din Cluj',
		numeJuridic: 'Asociația G.I.B.',
		oras: 'Cluj-Napoca',
		judet: 'Cluj',
		adresa: 'str. Decebal nr. 76, ap. 2',
		dataInfiintarii: '23/01/2006',
		presedinte: 'Andreea Țonu',
		telefon: '0724248118',
		email: 'office@gibcluj.ro',
		categorii: ['fondator', 'activ']
	},
	{
		abreviere: 'ATB',
		nume: 'Asociația Tinerilor Basarabeni din Brașov',
		numeJuridic: 'Asociația Tinerilor Basarabeni Brașov (ATB Brașov)',
		oras: 'Brașov',
		judet: 'Brașov',
		adresa: 'b-dul Eroilor n25, corpul T, sala TSI',
		dataInfiintarii: '09/04/2013',
		presedinte: 'Andreea Mihai',
		telefon: '0748313425',
		email: 'atb.brasov@gmail.com',
		categorii: ['fondator', 'activ']
	},

	/* Membri activi */
	{
		abreviere: 'AIT',
		nume: 'Asociația Inițiativa din Timișoara',
		numeJuridic: 'Asociația Inițiativa din Timișoara',
		oras: 'Timișoara',
		judet: 'Timiș',
		adresa: 'Splaiul Spiru Haret, Nr 1 A, sala H5',
		dataInfiintarii: '01/03/2022',
		presedinte: 'Vlad Vasilica',
		telefon: '0740921071',
		email: 'asociatia.initiativa@gmail.com',
		categorii: ['activ']
	},
	{
		abreviere: 'ASBP',
		nume: 'Asociația Studenților Basarabeni din Petroșani',
		numeJuridic: 'Asociația Studenților Basarabeni din Petroșani',
		oras: 'Petroșani',
		judet: 'Hunedoara',
		adresa: 'str. Universității, nr. 20, cămin studențesc nr. 1, cam 325',
		dataInfiintarii: '06/05/2014',
		presedinte: 'Anatolie Dembițchii',
		telefon: '0732504648',
		email: 'asbpetrosani@gmail.com',
		categorii: ['activ']
	},
	{
		abreviere: 'GITB',
		nume: 'Grupul de Inițiativă al Tinerilor Basarabeni din Bacău',
		numeJuridic: 'Asociația „Grupul de Inițiativă al Tinerilor Basarabeni din Bacău”',
		oras: 'Bacău',
		judet: 'Bacău',
		adresa: 'str. Milcov 122, sc. D, ap. 16, et. 3',
		dataInfiintarii: '25/08/2015',
		presedinte: 'Cristian Godoroaba',
		telefon: '0720985502',
		email: 'gitbbacau@gmail.com',
		categorii: ['activ']
	},
	{
		abreviere: 'OSB',
		nume: 'Organizația Studenților Basarabeni din Timișoara',
		numeJuridic: 'Asociația Organizația Studenților Basarabeni din Timișoara',
		oras: 'Timișoara',
		judet: 'Timiș',
		adresa: 'Aleea Ripensia, cămin C16, parter',
		dataInfiintarii: '03/05/2001',
		presedinte: 'Daniil Voluța',
		telefon: '0726102461',
		email: 'office@osb-timisoara.org',
		categorii: ['activ']
	},
	{
		abreviere: 'CTB',
		nume: 'Comunitatea Tinerilor Basarabeni din Constanța',
		numeJuridic: 'Asociația Comunitatea Tinerilor Basarabeni din Constanța',
		oras: 'Constanța',
		judet: 'Constanța',
		adresa: 'blvd. Mamaia 124, cămin C2 mansardă, sala M5',
		dataInfiintarii: '09/06/2022',
		presedinte: 'Vasile Cataraga',
		telefon: '0770615461',
		email: 'ctbconstanta@gmail.com',
		categorii: ['activ']
	},

	/* Membri candidați */
	{
		abreviere: 'OSB',
		nume: 'Organizația Studenților Basarabeni din București',
		numeJuridic: 'Asociația „Organizația Studenților Basarabeni din București”',
		oras: 'București',
		judet: 'București',
		presedinte: 'Codrina Pietraru',
		telefon: '0726474654',
		email: 'osb.buc@gmail.com',
		categorii: ['candidat']
	},
	{
		abreviere: 'CSBB',
		nume: 'Clubul Studenților Basarabeni și Bucovineni din Galați',
		numeJuridic: 'Clubul Studenților Basarabeni și Bucovineni „Ștefan cel Mare și Sfânt” din cadrul Ligii Studenților din Galați',
		oras: 'Galați',
		judet: 'Galați',
		adresa: 'str. Domnească 111, Corp D, Facultatea de Inginerie, sala D06',
		dataInfiintarii: '09/10/1996',
		presedinte: 'Nicoleta Bodrug',
		telefon: '0723913296',
		categorii: ['candidat']
	},
	{
		abreviere: 'ASB',
		nume: 'Asociația Studenților Basarabeni din Târgu Mureș',
		numeJuridic: 'Asociația Tinerilor Basarabeni din Mureș',
		oras: 'Târgu Mureș',
		judet: 'Mureș',
		adresa: 'str. Nicolae Iorga, nr.1, cam A011',
		dataInfiintarii: '26/04/2018',
		presedinte: 'Spivac Nicoleta',
		telefon: '0743311746',
		email: 'officeabmures@gmail.com',
		categorii: ['candidat']
	},
	{
		abreviere: 'OTB',
		nume: 'Organizația Tinerilor Basarabeni din Sibiu',
		numeJuridic: 'Asociația Organizația Tinerilor Studenți Basarabeni din Sibiu',
		oras: 'Sibiu',
		judet: 'Sibiu',
		adresa: 'str. Lucian Blaga nr. 2A, Facultatea de Medicină, corp C, sala 001',
		dataInfiintarii: '15/11/2019',
		presedinte: 'Bogdan Bunduchi',
		telefon: '0771110704',
		email: 'otbsibiu@gmail.com',
		categorii: ['candidat']
	},
	{
		abreviere: 'GIRB',
		nume: 'Grupul de Inițiativă al Românilor din Basarabia din Suceava',
		numeJuridic: 'Asociația „Grupul de Inițiativă al Românilor din Basarabia”',
		oras: 'Suceava',
		judet: 'Suceava',
		adresa: 'str. Universității, Nr 13, Bloc E, demisol',
		dataInfiintarii: '21/12/2007',
		presedinte: 'Alin Nitroșer',
		telefon: '0727131256',
		email: 'girbasarabia@gmail.com',
		categorii: ['candidat']
	},

	/* Membri potențiali candidați */
	{
		abreviere: 'CTB',
		nume: 'Comunitatea Tinerilor Basarabeni din Oradea',
		numeJuridic: 'Asociația Comunitatea Tinerilor Basarabeni din Oradea',
		oras: 'Oradea',
		judet: 'Bihor',
		presedinte: 'Bianca Marina Ganța',
		telefon: '0771630090',
		email: 'ctb.oradea@gmail.com',
		categorii: ['potential']
	},
	{
		abreviere: 'LSB',
		nume: 'Liga Studenților Basarabeni din Galați',
		numeJuridic: 'Asociația Liga Studenților Basarabeni din Galați',
		oras: 'Galați',
		judet: 'Galați',
		presedinte: 'Lungu Tatiana',
		telefon: '0712644813',
		email: 'lsbg.galati@yahoo.com',
		categorii: ['potential']
	}
];

export interface MembruEchipa {
	nume: string;
	rol: string;
	categorie: 'birou' | 'extinsa';
	/* TODO: adaugă foto URL când ACF e gata */
	foto?: string;
}

/*
 * TODO: De migrat la ACF CPT (câmpuri: nume, rol, categorie, foto)
 * când plugin-ul WPGraphQL pentru ACF e activat pe WP.
 */
export const membri: MembruEchipa[] = [
	/* Birou de conducere */
	{ nume: 'Paula Bodlev', rol: 'Președinte', categorie: 'birou' },
	{ nume: 'Laura Șoimu', rol: 'Secretar General', categorie: 'birou' },
	{ nume: 'Daniela Leu', rol: 'Vicepreședinte', categorie: 'birou' },
	{ nume: 'Valeria Moiseenco', rol: 'Vicepreședinte', categorie: 'birou' },
	{ nume: 'Daniel Caraion', rol: 'Vicepreședinte', categorie: 'birou' },

	/* Echipa extinsă */
	{ nume: 'Daniela Leu', rol: 'Coordonator campanie AdmiteRO', categorie: 'extinsa' },
	{ nume: 'Valeria Moiseenco', rol: 'Coordonator imagine', categorie: 'extinsa' },
	{ nume: 'Daniel Panicu', rol: 'Fotograf', categorie: 'extinsa' },
	{ nume: 'Victor Vlas', rol: 'Graphic Designer', categorie: 'extinsa' }
];

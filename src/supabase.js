// Local Storage Mock Database for Supabase replacement
const getLocalData = (key, defaultData) => {
  const stored = localStorage.getItem(`db_${key}`);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(`db_${key}`, JSON.stringify(defaultData));
  return defaultData;
};

const saveLocalData = (key, data) => {
  localStorage.setItem(`db_${key}`, JSON.stringify(data));
};

const initialProjects = [
  {
    id: 1,
    project_name: "Personal OS Redesign",
    description: "Premium personal dashboard with sleek dark glassmorphic design and smooth micro-animations.",
    progress: 75,
    note: "Reviewing mobile layout responsiveness next week.",
    status: "In Progress",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    project_name: "Finance Tracker Integration",
    description: "Expense and income tracking system with instant visual category reporting.",
    progress: 100,
    note: "All categories mapped and ready for deployment.",
    status: "Completed",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialDokumen = [
  {
    id: 1,
    nama_dokumen: "KTP - Kartu Tanda Penduduk",
    file_url: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=500&auto=format&fit=crop",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    nama_dokumen: "Ijazah SMA",
    file_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialSertifikat = [
  {
    id: 1,
    nama_sertifikat: "React Developer Certification",
    file_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&auto=format&fit=crop",
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    nama_sertifikat: "UI/UX Advanced Masterclass",
    file_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop",
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialTransactions = [
  {
    id: 1,
    description: "Kopi pagi & Croissant",
    amount: 35000,
    category: "Makan & Minum",
    type: "expense",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    description: "Hosting Website Vercel",
    amount: 320000,
    category: "Bisnis",
    type: "expense",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    description: "Gaji Freelance UI Design",
    amount: 1500000,
    category: "Bisnis",
    type: "income",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

class MockQueryBuilder {
  constructor(table) {
    this.table = table;
    this.data = [];
    if (table === 'projects') this.data = getLocalData('projects', initialProjects);
    else if (table === 'dokumen') this.data = getLocalData('dokumen', initialDokumen);
    else if (table === 'sertifikat') this.data = getLocalData('sertifikat', initialSertifikat);
    else if (table === 'transactions') this.data = getLocalData('transactions', initialTransactions);
    
    this.isCount = false;
  }

  select(fields, options = {}) {
    if (options.count === 'exact') {
      this.isCount = true;
    }
    return this;
  }

  order(field, { ascending } = { ascending: true }) {
    this.data.sort((a, b) => {
      let valA = a[field];
      let valB = b[field];
      if (typeof valA === 'string') {
        return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return ascending ? valA - valB : valB - valA;
    });
    return this;
  }

  limit(num) {
    this.data = this.data.slice(0, num);
    return this;
  }

  eq(field, value) {
    this.data = this.data.filter(item => item[field] === value);
    return this;
  }

  gte(field, value) {
    this.data = this.data.filter(item => item[field] >= value);
    return this;
  }

  async then(resolve) {
    try {
      if (this.isCount) {
        return resolve({ data: this.data, count: this.data.length, error: null });
      }
      return resolve({ data: this.data, count: this.data.length, error: null });
    } catch (e) {
      return resolve({ data: null, count: 0, error: e });
    }
  }

  async insert(rows) {
    const tableData = getLocalData(this.table, []);
    const newRows = rows.map((row, idx) => ({
      id: Date.now() + idx,
      created_at: new Date().toISOString(),
      ...row
    }));
    const current = [...tableData, ...newRows];
    saveLocalData(this.table, current);
    return { data: newRows, error: null };
  }

  update(fields) {
    return {
      eq: async (idField, idValue) => {
        const current = getLocalData(this.table, []);
        const updated = current.map(item => {
          if (item[idField] === idValue) {
            return { ...item, ...fields };
          }
          return item;
        });
        saveLocalData(this.table, updated);
        return { data: updated.filter(item => item[idField] === idValue), error: null };
      }
    };
  }

  delete() {
    return {
      eq: async (idField, idValue) => {
        const current = getLocalData(this.table, []);
        const filtered = current.filter(item => item[idField] !== idValue);
        saveLocalData(this.table, filtered);
        return { data: null, error: null };
      }
    };
  }
}

export const supabase = {
  from: (table) => new MockQueryBuilder(table),
  storage: {
    from: () => ({
      remove: async () => ({ error: null }),
      upload: async () => ({ error: null }),
      getPublicUrl: (filename) => {
        const placeholders = [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop"
        ];
        const randomUrl = placeholders[Math.floor(Math.random() * placeholders.length)];
        return { data: { publicUrl: randomUrl } };
      }
    })
  }
};

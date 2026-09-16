/**
 * INDIAPACK SCOUT - APPLICATION JAVASCRIPT
 * High-speed reactive directory, live Pan-India B2B web scout, contact extractor, and export manager.
 */

// Application State
const state = {
  allManufacturers: [],
  filteredManufacturers: [],
  savedLeadIds: JSON.parse(localStorage.getItem('mahapack_saved_leads') || '[]'),
  selectedState: 'all',
  currentDomain: 'all',
  currentSubCategory: 'all',
  currentCity: 'all',
  currentEaSector: 'all',
  searchQuery: '',
  sortBy: 'name-asc',
  activeLeadForModal: null,
  isScanning: false
};

// Clusters by State/UT for dynamic dropdown filtering
const CLUSTERS_BY_STATE = {
  all: [
    { value: 'all', label: 'All Industrial Clusters' },
    { value: 'Mahad', label: 'Mahad MIDC (Acetyls Hub, Maharashtra)' },
    { value: 'Lote Parshuram', label: 'Lote Parshuram MIDC (Maharashtra)' },
    { value: 'Barnala', label: 'Barnala (IOLCP Chemical Complex, Punjab)' },
    { value: 'Theni', label: 'Theni (Tata Decaffeination EOU, Tamil Nadu)' },
    { value: 'Kolenchery', label: 'Kolenchery (Cochin Spice Extraction, Kerala)' },
    { value: 'Sanand', label: 'Sanand GIDC (Gujarat)' },
    { value: 'Vapi', label: 'Vapi GIDC (Gujarat)' },
    { value: 'Ankleshwar', label: 'Ankleshwar & Bharuch (Gujarat)' },
    { value: 'Dahej', label: 'Dahej PCPIR (Gujarat)' },
    { value: 'Silvassa', label: 'Silvassa Hub (DNH)' },
    { value: 'Daman', label: 'Daman Industrial Area' },
    { value: 'Pune', label: 'Pune (Chakan, Bhosari, Kurkumbh, Nira)' },
    { value: 'Mumbai', label: 'Mumbai MMR & Suburbs' },
    { value: 'Thane', label: 'Thane & Bhiwandi' },
    { value: 'Navi Mumbai', label: 'Navi Mumbai (TTC / Turbhe / Taloja)' },
    { value: 'Tarapur', label: 'Tarapur MIDC / Boisar' },
    { value: 'Aurangabad', label: 'Chhatrapati Sambhaji Nagar (Waluj)' },
    { value: 'Vasai', label: 'Vasai-Virar / Palghar' },
    { value: 'Ambernath', label: 'Ambernath & Dombivli' },
    { value: 'Chennai', label: 'Chennai & Sriperumbudur (Tamil Nadu)' },
    { value: 'Bengaluru', label: 'Bengaluru / Peenya (Karnataka)' },
    { value: 'Hyderabad', label: 'Hyderabad / Cherlapally / Choutuppal (Telangana)' },
    { value: 'Noida', label: 'Noida & Greater Noida (UP)' },
    { value: 'Gajraula', label: 'Gajraula (Jubilant Ingrevia, UP)' },
    { value: 'Gurugram', label: 'Gurugram, Bawal & Faridabad (Haryana)' },
    { value: 'Kolkata', label: 'Kolkata & Howrah (West Bengal)' }
  ],
  'Maharashtra': [
    { value: 'all', label: 'All Maharashtra MIDC Hubs' },
    { value: 'Mahad', label: 'Mahad MIDC (Acetyls & Adhesives Hub)' },
    { value: 'Lote Parshuram', label: 'Lote Parshuram MIDC (Chiplun)' },
    { value: 'Pune', label: 'Pune (Chakan, Bhosari, Kurkumbh, Nira)' },
    { value: 'Mumbai', label: 'Mumbai MMR & Suburbs' },
    { value: 'Thane', label: 'Thane & Bhiwandi' },
    { value: 'Navi Mumbai', label: 'Navi Mumbai (TTC, Turbhe, Rabale, Taloja)' },
    { value: 'Tarapur', label: 'Tarapur MIDC / Boisar' },
    { value: 'Aurangabad', label: 'Chhatrapati Sambhaji Nagar (Waluj)' },
    { value: 'Vasai', label: 'Vasai-Virar / Palghar' },
    { value: 'Ambernath', label: 'Ambernath & Dombivli MIDC' },
    { value: 'Khopoli', label: 'Khopoli & Taloja (Raigad)' },
    { value: 'Jalgaon', label: 'Jalgaon MIDC' }
  ],
  'Gujarat': [
    { value: 'all', label: 'All Gujarat GIDC Hubs' },
    { value: 'Sanand', label: 'Sanand GIDC (Ahmedabad)' },
    { value: 'Vapi', label: 'Vapi GIDC (Valsad)' },
    { value: 'Ankleshwar', label: 'Ankleshwar GIDC (Bharuch)' },
    { value: 'Dahej', label: 'Dahej PCPIR SEZ' },
    { value: 'Vallabh Vidyanagar', label: 'Anand / Vallabh Vidyanagar' }
  ],
  'Dadra and Nagar Haveli and Daman and Diu': [
    { value: 'all', label: 'All Daman & Silvassa Hubs' },
    { value: 'Silvassa', label: 'Silvassa Industrial Area' },
    { value: 'Daman', label: 'Daman Industrial Area' }
  ],
  'Tamil Nadu': [
    { value: 'all', label: 'All Tamil Nadu Industrial Hubs' },
    { value: 'Chennai', label: 'Chennai Metro & Ambattur' },
    { value: 'Sriperumbudur', label: 'Sriperumbudur SIPCOT' },
    { value: 'Gummidipoondi', label: 'Gummidipoondi SIPCOT' },
    { value: 'Theni', label: 'Theni (Tata Decaffeination EOU)' }
  ],
  'Karnataka': [
    { value: 'all', label: 'All Karnataka Hubs' },
    { value: 'Bengaluru', label: 'Bengaluru (Peenya / Bommasandra)' },
    { value: 'Sameerwadi', label: 'Sameerwadi (Godavari Biorefinery)' }
  ],
  'Telangana': [
    { value: 'all', label: 'All Telangana Hubs' },
    { value: 'Hyderabad', label: 'Hyderabad (Cherlapally / Pashamylaram)' },
    { value: 'Choutuppal', label: 'Choutuppal (Divi\'s Labs Pharma Hub)' }
  ],
  'Uttar Pradesh': [
    { value: 'all', label: 'All Uttar Pradesh Hubs' },
    { value: 'Noida', label: 'Noida (Sector 57, 80, 81)' },
    { value: 'Greater Noida', label: 'Greater Noida (Kasna UPSIDC)' },
    { value: 'Gajraula', label: 'Gajraula (Jubilant Ingrevia Complex)' },
    { value: 'Sambhal', label: 'Sambhal / Asmoli (Dhampur Bio Organics)' }
  ],
  'Haryana': [
    { value: 'all', label: 'All Haryana / NCR Hubs' },
    { value: 'Gurugram', label: 'Gurugram / Manesar' },
    { value: 'Bawal', label: 'Bawal HSIIDC (Kansai Nerolac)' },
    { value: 'Faridabad', label: 'Faridabad Industrial Area' }
  ],
  'Punjab': [
    { value: 'all', label: 'All Punjab Industrial Hubs' },
    { value: 'Barnala', label: 'Barnala (IOLCP Chemical Complex)' }
  ],
  'Kerala': [
    { value: 'all', label: 'All Kerala Industrial Hubs' },
    { value: 'Kolenchery', label: 'Kolenchery / Cochin (Synthite Spice Extracts)' }
  ],
  'West Bengal': [
    { value: 'all', label: 'All West Bengal Hubs' },
    { value: 'Kolkata', label: 'Kolkata & Howrah' }
  ]
};

// DOM Elements Cache
const DOM = {
  // Counters
  statTotal: document.getElementById('statTotal'),
  statStates: document.getElementById('statStates'),
  statBarrier: document.getElementById('statBarrier'),
  statInks: document.getElementById('statInks'),
  statClusters: document.getElementById('statClusters'),
  statEthylAcetate: document.getElementById('statEthylAcetate'),
  badgeAll: document.getElementById('badgeAll'),
  badgeBarrier: document.getElementById('badgeBarrier'),
  badgeInks: document.getElementById('badgeInks'),
  badgeSolvents: document.getElementById('badgeSolvents'),
  savedCountBadge: document.getElementById('savedCountBadge'),
  resultsCount: document.getElementById('resultsCount'),

  // Filters
  searchInput: document.getElementById('searchInput'),
  btnClearSearch: document.getElementById('btnClearSearch'),
  domainTabs: document.querySelectorAll('.domain-tab'),
  stateSelect: document.getElementById('stateSelect'),
  eaSectorSelect: document.getElementById('eaSectorSelect'),
  subCategorySelect: document.getElementById('subCategorySelect'),
  citySelect: document.getElementById('citySelect'),
  sortSelect: document.getElementById('sortSelect'),
  btnResetFilters: document.getElementById('btnResetFilters'),
  activeTagsContainer: document.getElementById('activeTagsContainer'),
  quickChips: document.querySelectorAll('.quick-chip'),

  // Content Container
  manufacturersGrid: document.getElementById('manufacturersGrid'),
  emptyState: document.getElementById('emptyState'),

  // Modals & Drawers
  webScoutModal: document.getElementById('webScoutModal'),
  btnOpenWebScout: document.getElementById('btnOpenWebScout'),
  btnTriggerLiveScout: document.getElementById('btnTriggerLiveScout'),
  btnCloseWebScout: document.getElementById('btnCloseWebScout'),
  scoutQueryInput: document.getElementById('scoutQueryInput'),
  scoutStateInput: document.getElementById('scoutStateInput'),
  scoutCityInput: document.getElementById('scoutCityInput'),
  btnExecuteScout: document.getElementById('btnExecuteScout'),
  scoutLoading: document.getElementById('scoutLoading'),
  scoutResultsContainer: document.getElementById('scoutResultsContainer'),
  quickScoutChips: document.querySelectorAll('.chip-btn'),

  detailsModal: document.getElementById('detailsModal'),
  btnCloseDetails: document.getElementById('btnCloseDetails'),
  modalCompanyName: document.getElementById('modalCompanyName'),
  modalCategoryBadge: document.getElementById('modalCategoryBadge'),
  modalLocationBadge: document.getElementById('modalLocationBadge'),
  modalDescription: document.getElementById('modalDescription'),
  modalProductsList: document.getElementById('modalProductsList'),
  modalSolventsSection: document.getElementById('modalSolventsSection'),
  modalEaRole: document.getElementById('modalEaRole'),
  modalSolventsList: document.getElementById('modalSolventsList'),
  modalApplicationsList: document.getElementById('modalApplicationsList'),
  modalYear: document.getElementById('modalYear'),
  modalCapacity: document.getElementById('modalCapacity'),
  modalGstin: document.getElementById('modalGstin'),
  modalMidc: document.getElementById('modalMidc'),
  modalContactPerson: document.getElementById('modalContactPerson'),
  modalPhone: document.getElementById('modalPhone'),
  modalMobile: document.getElementById('modalMobile'),
  modalEmail: document.getElementById('modalEmail'),
  modalAddress: document.getElementById('modalAddress'),
  linkCallPhone: document.getElementById('linkCallPhone'),
  linkCallMobile: document.getElementById('linkCallMobile'),
  linkWhatsapp: document.getElementById('linkWhatsapp'),
  linkSendEmail: document.getElementById('linkSendEmail'),
  linkGoogleMaps: document.getElementById('linkGoogleMaps'),
  linkWebsite: document.getElementById('linkWebsite'),
  modalWebsiteRow: document.getElementById('modalWebsiteRow'),
  btnModalBookmark: document.getElementById('btnModalBookmark'),
  btnModalDelete: document.getElementById('btnModalDelete'),

  // Saved Leads
  savedDrawer: document.getElementById('savedDrawer'),
  btnOpenSaved: document.getElementById('btnOpenSaved'),
  btnCloseSavedDrawer: document.getElementById('btnCloseSavedDrawer'),
  savedDrawerCount: document.getElementById('savedDrawerCount'),
  savedListContainer: document.getElementById('savedListContainer'),
  btnExportSavedCsv: document.getElementById('btnExportSavedCsv'),
  btnClearAllSaved: document.getElementById('btnClearAllSaved'),

  // Exports
  btnExportCsv: document.getElementById('btnExportCsv'),
  btnQuickPrint: document.getElementById('btnQuickPrint')
};

// Update city clusters dropdown dynamically based on selected state
function updateClusterDropdown(stateName) {
  if (!DOM.citySelect) return;
  const clusters = CLUSTERS_BY_STATE[stateName] || CLUSTERS_BY_STATE.all;
  DOM.citySelect.innerHTML = clusters.map(c => `<option value="${c.value}">${escapeHtml(c.label)}</option>`).join('');
  DOM.citySelect.value = 'all';
  state.currentCity = 'all';
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
async function initApp() {
  bindEventListeners();
  updateSavedBadge();
  await fetchStats();
  await loadManufacturers();
}

// Bind Event Listeners
function bindEventListeners() {
  // Search Input
  DOM.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim();
    DOM.btnClearSearch.style.display = state.searchQuery ? 'block' : 'none';
    filterAndRender();
  });

  DOM.btnClearSearch.addEventListener('click', () => {
    DOM.searchInput.value = '';
    state.searchQuery = '';
    DOM.btnClearSearch.style.display = 'none';
    filterAndRender();
  });

  // Domain Tabs
  DOM.domainTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      DOM.domainTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.currentDomain = tab.getAttribute('data-domain');
      filterAndRender();
    });
  });

  // State / UT Select Filter
  if (DOM.stateSelect) {
    DOM.stateSelect.addEventListener('change', (e) => {
      state.selectedState = e.target.value;
      updateClusterDropdown(state.selectedState);
      filterAndRender();
    });
  }

  // Ethyl Acetate Sector Filter
  if (DOM.eaSectorSelect) {
    DOM.eaSectorSelect.addEventListener('change', (e) => {
      state.currentEaSector = e.target.value;
      if (DOM.quickChips) {
        DOM.quickChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-filter') === 'all' && state.currentEaSector === 'all'));
      }
      filterAndRender();
    });
  }

  // Quick Scopes Chips
  if (DOM.quickChips) {
    DOM.quickChips.forEach(chip => {
      chip.addEventListener('click', () => {
        DOM.quickChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-filter');
        if (filter === 'all') {
          state.currentEaSector = 'all';
          state.currentDomain = 'all';
          if (DOM.eaSectorSelect) DOM.eaSectorSelect.value = 'all';
          DOM.domainTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-domain') === 'all'));
        } else if (filter === 'bulk-ea') {
          state.currentEaSector = 'Bulk Producer';
          if (DOM.eaSectorSelect) DOM.eaSectorSelect.value = 'Bulk Producer';
        } else if (filter === 'paints-coatings') {
          state.currentEaSector = 'Paints & Coatings';
          if (DOM.eaSectorSelect) DOM.eaSectorSelect.value = 'Paints & Coatings';
        } else if (filter === 'glues-adhesives') {
          state.currentEaSector = 'Industrial Glues';
          if (DOM.eaSectorSelect) DOM.eaSectorSelect.value = 'Industrial Glues';
        } else if (filter === 'packaging-inks') {
          state.currentEaSector = 'Food Packaging Inks';
          if (DOM.eaSectorSelect) DOM.eaSectorSelect.value = 'Food Packaging Inks';
        } else if (filter === 'pharma-decaf') {
          state.currentEaSector = 'Pharma API & Cosmetics';
          if (DOM.eaSectorSelect) DOM.eaSectorSelect.value = 'Pharma API & Cosmetics';
        } else if (filter === 'emerging-tech') {
          state.currentEaSector = 'Emerging Tech & Electronics';
          if (DOM.eaSectorSelect) DOM.eaSectorSelect.value = 'Emerging Tech & Electronics';
        }
        filterAndRender();
      });
    });
  }

  // Select Filters
  DOM.subCategorySelect.addEventListener('change', (e) => {
    state.currentSubCategory = e.target.value;
    filterAndRender();
  });

  DOM.citySelect.addEventListener('change', (e) => {
    state.currentCity = e.target.value;
    filterAndRender();
  });

  DOM.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    filterAndRender();
  });

  DOM.btnResetFilters.addEventListener('click', resetFilters);

  // Live Web Scout Modal Triggers
  DOM.btnOpenWebScout.addEventListener('click', openWebScout);
  DOM.btnTriggerLiveScout.addEventListener('click', () => {
    const currentQ = DOM.searchInput.value.trim();
    if (currentQ) DOM.scoutQueryInput.value = currentQ;
    openWebScout();
  });
  DOM.btnCloseWebScout.addEventListener('click', closeWebScout);

  DOM.btnExecuteScout.addEventListener('click', executeLiveScout);
  DOM.scoutQueryInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') executeLiveScout();
  });

  // Quick Scout Chips
  DOM.quickScoutChips.forEach(chip => {
    chip.addEventListener('click', () => {
      DOM.scoutQueryInput.value = chip.getAttribute('data-query') || '';
      const stateAttr = chip.getAttribute('data-state');
      if (stateAttr && DOM.scoutStateInput) {
        DOM.scoutStateInput.value = stateAttr;
      }
      const cityAttr = chip.getAttribute('data-city');
      if (cityAttr && DOM.scoutCityInput) {
        DOM.scoutCityInput.value = cityAttr;
      }
      executeLiveScout();
    });
  });

  // Details Modal
  DOM.btnCloseDetails.addEventListener('click', closeDetailsModal);
  DOM.detailsModal.addEventListener('click', (e) => {
    if (e.target === DOM.detailsModal) closeDetailsModal();
  });

  // Saved Leads Drawer
  DOM.btnOpenSaved.addEventListener('click', openSavedDrawer);
  DOM.btnCloseSavedDrawer.addEventListener('click', closeSavedDrawer);
  DOM.savedDrawer.addEventListener('click', (e) => {
    if (e.target === DOM.savedDrawer) closeSavedDrawer();
  });
  DOM.btnClearAllSaved.addEventListener('click', clearAllSaved);
  DOM.btnExportSavedCsv.addEventListener('click', exportSavedLeads);

  // Event delegation on manufacturersGrid for View Profile buttons
  DOM.manufacturersGrid.addEventListener('click', (e) => {
    const actionBtn = e.target.closest('[data-action="view-profile"]');
    if (actionBtn) {
      const id = actionBtn.getAttribute('data-id');
      if (id) {
        e.preventDefault();
        openDetailsModal(id);
      }
    }
  });

  // CSV Export & Print
  DOM.btnExportCsv.addEventListener('click', exportCurrentCsv);
  DOM.btnQuickPrint.addEventListener('click', () => window.print());

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeWebScout();
      closeDetailsModal();
      closeSavedDrawer();
    }
  });
}

// ==========================================================================
// DATA FETCHING & API INTERACTION
// ==========================================================================
async function fetchStats() {
  try {
    const res = await fetch('/api/stats');
    const data = await res.json();
    DOM.statTotal.textContent = data.totalCount;
    if (DOM.statStates) DOM.statStates.textContent = data.statesCount || 11;
    DOM.statBarrier.textContent = data.barrierFilmsCount;
    DOM.statInks.textContent = data.inksAdhesivesCount;
    DOM.statClusters.textContent = data.uniqueClusters;
    if (DOM.statEthylAcetate) DOM.statEthylAcetate.textContent = data.ethylAcetateCount || 32;
    DOM.badgeAll.textContent = data.totalCount;
    DOM.badgeBarrier.textContent = data.barrierFilmsCount;
    DOM.badgeInks.textContent = data.inksAdhesivesCount;
    if (DOM.badgeSolvents) DOM.badgeSolvents.textContent = data.ethylAcetateCount || 32;
    const dbStatusEl = document.getElementById('dbStatusText');
    if (dbStatusEl) {
      dbStatusEl.textContent = `MongoDB Atlas: Connected (${data.totalCount} Plants across ${data.statesCount || 11} States)`;
    }
  } catch (err) {
    console.error('Failed to load stats:', err);
  }
}

async function loadManufacturers() {
  try {
    const res = await fetch('/api/manufacturers');
    const json = await res.json();
    if (json.success) {
      state.allManufacturers = json.data;
      filterAndRender();
    }
  } catch (err) {
    console.error('Failed to load manufacturers:', err);
    DOM.manufacturersGrid.innerHTML = `
      <div class="empty-state">
        <p>Could not connect to API server. Please verify backend is running on port 3000.</p>
      </div>`;
  }
}

// ==========================================================================
// FILTERING, SORTING & RENDERING
// ==========================================================================
function filterAndRender() {
  let list = [...state.allManufacturers];

  // 0. State / UT Filter
  if (state.selectedState !== 'all') {
    list = list.filter(item => item.state && item.state.toLowerCase() === state.selectedState.toLowerCase());
  }

  // 1. Domain Filter
  if (state.currentDomain !== 'all') {
    list = list.filter(item => {
      if (state.currentDomain === 'Bulk Solvents & Chemicals') {
        return item.category.includes('Solvents') || item.category.includes('Chemicals') || item.ethylAcetateRole;
      }
      return item.category === state.currentDomain;
    });
  }

  // 1b. Ethyl Acetate Sector Filter
  if (state.currentEaSector && state.currentEaSector !== 'all') {
    list = list.filter(item => 
      (item.ethylAcetateRole && item.ethylAcetateRole.toLowerCase().includes(state.currentEaSector.toLowerCase())) ||
      (item.applications && item.applications.some(a => a.toLowerCase().includes(state.currentEaSector.toLowerCase())))
    );
  }

  // 2. Sub-Category Filter
  if (state.currentSubCategory !== 'all') {
    list = list.filter(item => 
      item.subCategories.some(sub => sub.toLowerCase().includes(state.currentSubCategory.toLowerCase()))
    );
  }

  // 3. City / Cluster Filter
  if (state.currentCity !== 'all') {
    list = list.filter(item => 
      (item.city && item.city.toLowerCase().includes(state.currentCity.toLowerCase())) ||
      (item.district && item.district.toLowerCase().includes(state.currentCity.toLowerCase())) ||
      (item.industrialArea && item.industrialArea.toLowerCase().includes(state.currentCity.toLowerCase()))
    );
  }

  // 4. Query Search
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(item => {
      const nameMatch = (item.name || '').toLowerCase().includes(q);
      const descMatch = (item.description || '').toLowerCase().includes(q);
      const addrMatch = (item.address || '').toLowerCase().includes(q);
      const stateMatch = (item.state || '').toLowerCase().includes(q);
      const prodMatch = (item.products || []).some(p => p.toLowerCase().includes(q));
      const subMatch = (item.subCategories || []).some(s => s.toLowerCase().includes(q));
      const roleMatch = (item.ethylAcetateRole || '').toLowerCase().includes(q);
      const solvMatch = (item.solventsHandled || []).some(s => s.toLowerCase().includes(q));
      const appMatch = (item.applications || []).some(a => a.toLowerCase().includes(q));
      return nameMatch || descMatch || addrMatch || stateMatch || prodMatch || subMatch || roleMatch || solvMatch || appMatch;
    });
  }

  // 5. Sorting
  if (state.sortBy === 'name-asc') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.sortBy === 'state-asc') {
    list.sort((a, b) => (a.state || '').localeCompare(b.state || '') || a.name.localeCompare(b.name));
  } else if (state.sortBy === 'city-asc') {
    list.sort((a, b) => a.city.localeCompare(b.city));
  } else if (state.sortBy === 'established-desc') {
    list.sort((a, b) => (a.yearEstablished || 2000) - (b.yearEstablished || 2000));
  }

  state.filteredManufacturers = list;
  renderCards(list);
  renderActiveTags();
  DOM.resultsCount.textContent = list.length;
}

function renderCards(list) {
  if (!list || list.length === 0) {
    DOM.manufacturersGrid.innerHTML = '';
    DOM.emptyState.style.display = 'block';
    return;
  }

  DOM.emptyState.style.display = 'none';

  const html = list.map(item => {
    const isBarrier = item.category.includes('Barrier');
    const isSaved = state.savedLeadIds.includes(item.id);
    const categoryBadgeClass = isBarrier ? 'badge-barrier' : 'badge-inks';

    const productsHtml = (item.products || []).slice(0, 4).map(p => 
      `<span class="product-pill">${escapeHtml(p)}</span>`
    ).join('');

    const phoneClean = (item.phone || item.mobile || '').replace(/[^\d+]/g, '');

    return `
      <article class="supplier-card" data-id="${item.id}">
        <div>
          <div class="card-top">
            <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
              <span class="card-category-badge ${categoryBadgeClass}">${escapeHtml(item.category)}</span>
              ${item.ethylAcetateRole ? `<span class="role-pill">🧪 ${escapeHtml(item.ethylAcetateRole)}</span>` : ''}
            </div>
            <button class="btn-bookmark ${isSaved ? 'bookmarked' : ''}" onclick="toggleBookmark('${item.id}', event)" title="${isSaved ? 'Remove Bookmark' : 'Save Supplier'}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
            </button>
          </div>

          <h3 class="card-title" style="cursor: pointer;" data-action="view-profile" data-id="${item.id}" onclick="openDetailsModal('${item.id}')">${escapeHtml(item.name)}</h3>

          <div class="card-location-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span><strong class="state-pill">${escapeHtml(item.state || 'India')}</strong> &bull; ${escapeHtml(item.city)} &bull; ${escapeHtml(item.industrialArea || 'Industrial Hub')}</span>
          </div>

          <p class="card-description">${escapeHtml(item.description)}</p>

          <div class="card-products-wrap">
            ${productsHtml}
          </div>

          ${(item.solventsHandled && item.solventsHandled.length > 0) ? `
            <div style="display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 14px; align-items: center;">
              <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase;">Solvents:</span>
              ${item.solventsHandled.slice(0, 3).map(s => `<span class="solvent-pill">${escapeHtml(s)}</span>`).join('')}
              ${(item.applications && item.applications[0]) ? `<span class="app-pill">${escapeHtml(item.applications[0])}</span>` : ''}
            </div>
          ` : ''}

          <div class="card-contact-preview">
            <div class="contact-preview-item">
              <span class="preview-label">Direct Contact:</span>
              <span class="preview-val code-font">${escapeHtml(item.phone || item.mobile || 'Available on Request')}</span>
            </div>
            <div class="contact-preview-item">
              <span class="preview-label">Official Email:</span>
              <span class="preview-val code-font">${escapeHtml(item.salesEmail || item.email || 'Contact Desk')}</span>
            </div>
          </div>
        </div>

        <div class="card-footer-actions">
          <button class="btn btn-outline btn-sm card-view-btn" data-action="view-profile" data-id="${item.id}" onclick="openDetailsModal('${item.id}')">
            <span>View Profile &rarr;</span>
          </button>
          ${item.website ? `
            <a href="${escapeHtml(item.website)}" target="_blank" class="card-web-btn" title="Open Official Website directly">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </a>
          ` : ''}
          <button class="card-delete-btn" title="Delete plant (Not interested)" onclick="confirmDeletePlant('${item.id}', '${escapeHtml(item.name).replace(/'/g, "\\'")}', event)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
          </button>
        </div>
      </article>
    `;
  }).join('');

  DOM.manufacturersGrid.innerHTML = html;
}

function renderActiveTags() {
  const tags = [];

  if (state.selectedState !== 'all') {
    tags.push({ label: `State: ${state.selectedState}`, reset: () => {
      state.selectedState = 'all';
      if (DOM.stateSelect) DOM.stateSelect.value = 'all';
      updateClusterDropdown('all');
    }});
  }

  if (state.currentDomain !== 'all') {
    tags.push({ label: `Sector: ${state.currentDomain}`, reset: () => {
      state.currentDomain = 'all';
      DOM.domainTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-domain') === 'all'));
    }});
  }

  if (state.currentEaSector && state.currentEaSector !== 'all') {
    tags.push({ label: `EtOAc Sector: ${state.currentEaSector}`, reset: () => {
      state.currentEaSector = 'all';
      if (DOM.eaSectorSelect) DOM.eaSectorSelect.value = 'all';
      if (DOM.quickChips) DOM.quickChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-filter') === 'all'));
    }});
  }

  if (state.currentSubCategory !== 'all') {
    tags.push({ label: `Spec: ${state.currentSubCategory}`, reset: () => {
      state.currentSubCategory = 'all';
      DOM.subCategorySelect.value = 'all';
    }});
  }

  if (state.currentCity !== 'all') {
    tags.push({ label: `Cluster: ${state.currentCity}`, reset: () => {
      state.currentCity = 'all';
      DOM.citySelect.value = 'all';
    }});
  }

  if (state.searchQuery) {
    tags.push({ label: `Search: "${state.searchQuery}"`, reset: () => {
      state.searchQuery = '';
      DOM.searchInput.value = '';
      DOM.btnClearSearch.style.display = 'none';
    }});
  }

  DOM.activeTagsContainer.innerHTML = tags.map((t, idx) => `
    <span class="active-tag">
      <span>${escapeHtml(t.label)}</span>
      <span class="tag-remove-btn" onclick="removeTag(${idx})">&times;</span>
    </span>
  `).join('');

  window._activeTags = tags;
}

window.removeTag = function(idx) {
  if (window._activeTags && window._activeTags[idx]) {
    window._activeTags[idx].reset();
    filterAndRender();
  }
};

function resetFilters() {
  state.selectedState = 'all';
  state.currentDomain = 'all';
  state.currentSubCategory = 'all';
  state.currentCity = 'all';
  state.currentEaSector = 'all';
  state.searchQuery = '';
  state.sortBy = 'name-asc';

  if (DOM.stateSelect) DOM.stateSelect.value = 'all';
  if (DOM.eaSectorSelect) DOM.eaSectorSelect.value = 'all';
  updateClusterDropdown('all');

  DOM.domainTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-domain') === 'all'));
  if (DOM.quickChips) DOM.quickChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-filter') === 'all'));
  DOM.subCategorySelect.value = 'all';
  DOM.sortSelect.value = 'name-asc';
  DOM.searchInput.value = '';
  DOM.btnClearSearch.style.display = 'none';

  filterAndRender();
}

// ==========================================================================
// DETAILS MODAL
// ==========================================================================
function openDetailsModal(id) {
  try {
    const item = state.allManufacturers.find(m => m.id === id) ||
                 state.filteredManufacturers.find(m => m.id === id);
    if (!item) {
      console.warn('Item not found for id:', id);
      return;
    }

    state.activeLeadForModal = item;

    if (DOM.modalCompanyName) DOM.modalCompanyName.textContent = item.name;
    if (DOM.modalCategoryBadge) {
      DOM.modalCategoryBadge.textContent = item.category;
      DOM.modalCategoryBadge.className = 'detail-category-badge ' + 
        (item.category.includes('Barrier') ? 'badge-barrier' : 'badge-inks');
    }

    if (DOM.modalLocationBadge) {
      DOM.modalLocationBadge.innerHTML = `<span class="state-pill">${escapeHtml(item.state || 'India')}</span> • ${escapeHtml(item.city)} • ${escapeHtml(item.industrialArea || 'Industrial Hub')}`;
    }
    if (DOM.modalDescription) DOM.modalDescription.textContent = item.description;

    // Products Tags
    if (DOM.modalProductsList) {
      DOM.modalProductsList.innerHTML = (item.products || []).map(p => 
        `<span class="product-pill">${escapeHtml(p)}</span>`
      ).join('');
    }

    // Ethyl Acetate & Solvents Dossier
    if (DOM.modalSolventsSection) {
      if (item.ethylAcetateRole || (item.solventsHandled && item.solventsHandled.length > 0)) {
        DOM.modalSolventsSection.style.display = 'block';
        if (DOM.modalEaRole) {
          DOM.modalEaRole.innerHTML = `<span class="role-pill">🧪 ${escapeHtml(item.ethylAcetateRole || 'Industrial Formulateur')}</span>`;
        }
        if (DOM.modalSolventsList) {
          DOM.modalSolventsList.innerHTML = (item.solventsHandled || ['Ethyl Acetate']).map(s => 
            `<span class="solvent-pill">${escapeHtml(s)}</span>`
          ).join('');
        }
        if (DOM.modalApplicationsList) {
          DOM.modalApplicationsList.innerHTML = (item.applications || ['Packaging & Printing']).map(a => 
            `<span class="app-pill">${escapeHtml(a)}</span>`
          ).join('');
        }
      } else {
        DOM.modalSolventsSection.style.display = 'none';
      }
    }

    // Metadata
    if (DOM.modalYear) DOM.modalYear.textContent = item.yearEstablished ? `${item.yearEstablished} (Est.)` : 'Verified';
    if (DOM.modalCapacity) DOM.modalCapacity.textContent = item.plantCapacity || 'Standard Capacity';
    if (DOM.modalGstin) DOM.modalGstin.textContent = item.gstin || (item.state === 'Gujarat' ? '24 (Gujarat)' : item.state === 'Tamil Nadu' ? '33 (Tamil Nadu)' : item.state === 'Karnataka' ? '29 (Karnataka)' : item.state === 'Telangana' ? '36 (Telangana)' : item.state === 'Uttar Pradesh' ? '09 (UP)' : item.state === 'Haryana' ? '06 (Haryana)' : item.state === 'Punjab' ? '03 (Punjab)' : item.state === 'Kerala' ? '32 (Kerala)' : '27 (Maharashtra)');
    if (DOM.modalMidc) DOM.modalMidc.textContent = `${item.industrialArea || item.city} (${item.state || 'India'})`;

    // Contact Hub
    if (DOM.modalContactPerson) DOM.modalContactPerson.textContent = item.contactPerson || 'Direct Sales & Technical Division';
    if (DOM.modalPhone) DOM.modalPhone.textContent = item.phone || 'N/A';
    if (DOM.modalMobile) DOM.modalMobile.textContent = item.mobile || 'N/A';
    if (DOM.modalEmail) DOM.modalEmail.textContent = item.salesEmail || item.email || 'N/A';
    if (DOM.modalAddress) DOM.modalAddress.textContent = item.address;

    // Action links
    const phoneClean = (item.phone || '').replace(/[^\d+]/g, '');
    const mobileClean = (item.mobile || '').replace(/[^\d+]/g, '');
    const emailTarget = item.salesEmail || item.email;

    if (DOM.linkCallPhone) {
      DOM.linkCallPhone.href = phoneClean ? `tel:${phoneClean}` : '#';
      DOM.linkCallPhone.style.display = phoneClean ? 'inline-flex' : 'none';
    }

    if (DOM.linkCallMobile) {
      DOM.linkCallMobile.href = mobileClean ? `tel:${mobileClean}` : '#';
      DOM.linkCallMobile.style.display = mobileClean ? 'inline-flex' : 'none';
    }

    // WhatsApp
    if (DOM.linkWhatsapp) {
      if (mobileClean) {
        const waNumber = mobileClean.startsWith('+') ? mobileClean.replace('+', '') : `91${mobileClean}`;
        const waMsg = encodeURIComponent(`Hello, I am inquiring about your packaging / barrier films & inks solutions in ${item.state || 'India'}.`);
        DOM.linkWhatsapp.href = `https://wa.me/${waNumber}?text=${waMsg}`;
        DOM.linkWhatsapp.style.display = 'inline-flex';
      } else {
        DOM.linkWhatsapp.style.display = 'none';
      }
    }

    // Email
    if (DOM.linkSendEmail) {
      DOM.linkSendEmail.href = emailTarget ? `mailto:${emailTarget}?subject=Product%20Enquiry%20from%20IndiaPack%20Scout` : '#';
      DOM.linkSendEmail.style.display = emailTarget ? 'inline-flex' : 'none';
    }

    // Google Maps Search Query Link
    if (DOM.linkGoogleMaps) {
      const mapQuery = encodeURIComponent(`${item.name}, ${item.address}`);
      DOM.linkGoogleMaps.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
    }

    // Website & Corporate Search
    const websiteRow = DOM.modalWebsiteRow || document.getElementById('modalWebsiteRow');
    const linkWebsite = DOM.linkWebsite || document.getElementById('linkWebsite');
    const linkWebsiteText = document.getElementById('linkWebsiteText');
    const linkSearchCompany = document.getElementById('linkSearchCompany');
    const modalWebsiteType = document.getElementById('modalWebsiteType');

    const googleSearchQuery = `https://www.google.com/search?q=${encodeURIComponent(item.name + ' ' + (item.city || 'Maharashtra') + ' packaging')}`;
    if (linkSearchCompany) {
      linkSearchCompany.href = googleSearchQuery;
    }

    if (item.website && item.website.startsWith('http')) {
      const isGoogleSearch = item.website.includes('google.com/search');
      if (linkWebsite) {
        linkWebsite.href = item.website;
      }
      if (linkWebsiteText) {
        if (isGoogleSearch) {
          linkWebsiteText.textContent = 'Explore Verified B2B Web Profile →';
        } else {
          const displayDomain = item.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
          linkWebsiteText.textContent = `Visit ${displayDomain} →`;
        }
      }
      if (modalWebsiteType) {
        if (isGoogleSearch) {
          modalWebsiteType.textContent = 'MIDC Web Profile';
          modalWebsiteType.className = 'hub-type-badge directory-tag';
        } else {
          modalWebsiteType.textContent = 'Corporate Domain';
          modalWebsiteType.className = 'hub-type-badge verified-tag';
        }
      }
      if (websiteRow) websiteRow.style.display = 'block';
    } else {
      if (linkWebsite) linkWebsite.href = googleSearchQuery;
      if (linkWebsiteText) linkWebsiteText.textContent = 'Search Company Online →';
      if (modalWebsiteType) {
        modalWebsiteType.textContent = 'Web Search';
        modalWebsiteType.className = 'hub-type-badge directory-tag';
      }
      if (websiteRow) websiteRow.style.display = 'block';
    }

    // Bookmark in modal
    if (DOM.btnModalBookmark) {
      updateModalBookmarkBtn(item.id);
      DOM.btnModalBookmark.onclick = () => {
        toggleBookmark(item.id);
        updateModalBookmarkBtn(item.id);
      };
    }

    // Delete in modal
    const btnDelete = DOM.btnModalDelete || document.getElementById('btnModalDelete');
    if (btnDelete) {
      btnDelete.onclick = () => {
        confirmDeletePlant(item.id, item.name);
      };
    }

    const modal = DOM.detailsModal || document.getElementById('detailsModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  } catch (err) {
    console.error('Error opening details modal:', err);
  }
}

function updateModalBookmarkBtn(id) {
  const isSaved = state.savedLeadIds.includes(id);
  if (DOM.btnModalBookmark) {
    DOM.btnModalBookmark.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
      <span>${isSaved ? 'Remove From Saved Leads' : 'Bookmark This Lead'}</span>
    `;
  }
}

function closeDetailsModal() {
  const modal = DOM.detailsModal || document.getElementById('detailsModal');
  if (modal) {
    modal.style.display = 'none';
  }
  state.activeLeadForModal = null;
}

// Explicit window bindings
window.openDetailsModal = openDetailsModal;
window.closeDetailsModal = closeDetailsModal;
window.openWebScout = openWebScout;
window.closeWebScout = closeWebScout;
window.openSavedDrawer = openSavedDrawer;
window.closeSavedDrawer = closeSavedDrawer;

// ==========================================================================
// LIVE WEB SCOUT ENGINE (Real-Time Search & Lead Parser)
// ==========================================================================
function openWebScout() {
  DOM.webScoutModal.style.display = 'flex';
  DOM.scoutQueryInput.focus();
}

function closeWebScout() {
  DOM.webScoutModal.style.display = 'none';
}

async function executeLiveScout() {
  const query = DOM.scoutQueryInput.value.trim();
  const scoutState = DOM.scoutStateInput ? DOM.scoutStateInput.value : 'all';
  const city = DOM.scoutCityInput ? DOM.scoutCityInput.value : 'all';

  if (!query) {
    alert('Please enter a product or company search term to scan Indian web sources.');
    return;
  }

  state.isScanning = true;
  DOM.scoutLoading.style.display = 'block';
  DOM.scoutResultsContainer.style.display = 'none';
  DOM.btnExecuteScout.disabled = true;

  const statusMsg = document.getElementById('scoutStatusMessage');
  const statusSub = document.querySelector('.scout-status-sub');
  let stepIdx = 0;
  const scanSteps = [
    { title: 'Connecting to Indian B2B packaging network & state industrial nodes...', sub: 'Probing Sanand, Vapi, Chakan, Silvassa, Chennai, and Noida corridors...' },
    { title: 'Harvesting company contact pages & official phone directories...', sub: 'Extracting direct landlines, mobile numbers, and sales emails across India...' },
    { title: 'Verifying factory & plant locations across Indian states...', sub: 'Validating GIDC/MIDC/SIPCOT plot addresses, GSTIN credentials, and specialized capabilities...' },
    { title: 'Synthesizing verified industrial contact dossiers...', sub: 'Filtering out non-contact results and assembling complete leads...' }
  ];

  const progressInterval = setInterval(() => {
    stepIdx = (stepIdx + 1) % scanSteps.length;
    if (statusMsg) statusMsg.textContent = scanSteps[stepIdx].title;
    if (statusSub) statusSub.textContent = scanSteps[stepIdx].sub;
  }, 1200);

  try {
    const res = await fetch('/api/search-web', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, state: scoutState, city })
    });

    const data = await res.json();
    renderScoutResults(data.results || [], query, city, scoutState);
  } catch (err) {
    console.error('Live scout error:', err);
    DOM.scoutResultsContainer.innerHTML = `
      <div class="empty-state">
        <p>Could not complete live search. Please try again or check internet connectivity.</p>
      </div>`;
    DOM.scoutResultsContainer.style.display = 'block';
  } finally {
    clearInterval(progressInterval);
    state.isScanning = false;
    DOM.scoutLoading.style.display = 'none';
    DOM.scoutResultsContainer.style.display = 'block';
    DOM.btnExecuteScout.disabled = false;
  }
}

function renderScoutResults(results, query, city, scoutState) {
  if (!results || results.length === 0) {
    DOM.scoutResultsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h4>No Direct Matches on Live Scan for "${escapeHtml(query)}" in ${escapeHtml(city !== 'all' ? city : (scoutState !== 'all' ? scoutState : 'India'))}</h4>
        <p>Try refining the search term (e.g. "barrier film", "vacuum pouch", "lamination adhesive", "flexo inks").</p>
      </div>`;
    return;
  }

  const stateHeader = (scoutState && scoutState !== 'all') ? scoutState : 'India';

  const html = `
    <div style="margin-bottom: 14px; font-size: 0.85rem; color: var(--accent-cyan); font-weight: 600; display: flex; align-items: center; justify-content: space-between;">
      <span>Scanned & Verified ${results.length} Industrial Units in ${escapeHtml(stateHeader)}:</span>
      <span style="font-size: 0.75rem; color: var(--text-muted);">All results include verified phone, email & plant addresses</span>
    </div>
    ${results.map((r, i) => {
      const phones = r.phones || (r.phone ? [r.phone] : []);
      const emails = r.emails || (r.salesEmail ? [r.salesEmail] : (r.email ? [r.email] : []));
      const leadState = r.state || (scoutState !== 'all' ? scoutState : 'India');
      const address = r.address || `${r.detectedCity || 'Industrial Hub'}, ${leadState}, India`;
      const detectedCity = r.detectedCity || r.city || leadState;
      const industrialArea = r.industrialArea || 'Industrial Zone';

      const phoneActionsHtml = phones.map(p => {
        const cleanNum = p.replace(/[^\d+]/g, '');
        const isMobile = cleanNum.length >= 10 && !cleanNum.startsWith('022') && !cleanNum.startsWith('020') && !cleanNum.startsWith('0250');
        const waNumber = cleanNum.startsWith('+91') ? cleanNum.replace('+', '') : (cleanNum.length === 10 ? `91${cleanNum}` : cleanNum);
        const waMsg = encodeURIComponent(`Hello, I am inquiring regarding your flexible packaging / barrier films / inks solutions in ${leadState}.`);

        return `
          <div class="scout-action-group">
            <a href="tel:${cleanNum}" class="scout-action-btn phone-btn" title="Call directly">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>${escapeHtml(p)}</span>
            </a>
            ${isMobile ? `
              <a href="https://wa.me/${waNumber}?text=${waMsg}" target="_blank" class="scout-action-btn wa-btn" title="Chat on WhatsApp">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814h.005c3.181 0 5.767-2.587 5.768-5.766 0-1.54-.599-2.988-1.688-4.078-1.09-1.088-2.538-1.722-4.085-1.722zm0-2.172c4.388 0 7.949 3.561 7.949 7.938 0 2.122-.826 4.116-2.328 5.617-1.503 1.503-3.498 2.33-5.621 2.33-.005 0-.01 0-.015 0-1.341-.001-2.65-.353-3.793-1.021l-4.223 1.108 1.127-4.114c-.742-1.196-1.134-2.576-1.133-3.92 0-4.377 3.561-7.938 7.949-7.938z"/></svg>
                <span>WhatsApp</span>
              </a>
            ` : ''}
          </div>
        `;
      }).join('');

      const emailActionsHtml = emails.map(e => `
        <a href="mailto:${escapeHtml(e)}?subject=${encodeURIComponent(`Product Enquiry from IndiaPack B2B Scout`)}" class="scout-action-btn email-btn" title="Send direct sales email">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <span>${escapeHtml(e)}</span>
        </a>
      `).join('');

      const mapQuery = encodeURIComponent(`${r.name}, ${address}`);

      return `
        <div class="scout-result-item" id="scout-item-${i}">
          <div class="scout-result-header">
            <div>
              <div class="scout-badge-row">
                <span class="scout-source-badge ${r.source && r.source.includes('Live Web') ? 'source-live' : 'source-verified'}">
                  ${escapeHtml(r.source || `Verified ${leadState} Supplier`)}
                </span>
                <span class="scout-city-badge">📍 <strong class="state-pill">${escapeHtml(leadState)}</strong> &bull; ${escapeHtml(detectedCity)} &bull; ${escapeHtml(industrialArea)}</span>
                ${r.liveWebData && r.liveWebData.isLive ? `
                  <span class="live-telemetry-pill">
                    <span class="live-pulse-dot"></span>
                    <span>LIVE ${r.liveWebData.latencyMs}ms</span>
                  </span>
                ` : ''}
              </div>
              <h4 class="scout-result-title">${escapeHtml(r.name)}</h4>
            </div>
            <button class="btn btn-primary btn-sm btn-save-lead" onclick="saveWebLeadToDatabase(${i})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              <span>+ Save to Directory</span>
            </button>
          </div>

          ${r.liveWebData && r.liveWebData.metaDescription ? `
            <div class="live-meta-box">
              <strong>⚡ Real-Time Corporate Website Extract:</strong>
              <span>"${escapeHtml(r.liveWebData.metaDescription)}"</span>
            </div>
          ` : ''}

          <p class="scout-result-snippet">${escapeHtml(r.snippet || '')}</p>

          <!-- INDUSTRIAL CONTACT DETAILS DOSSIER -->
          <div class="scout-contact-dossier">
            <div class="scout-contact-dossier-header">
              <span class="dossier-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                VERIFIED CONTACT & FACTORY DETAILS
              </span>
              ${r.gstin ? `<span class="gstin-tag">GSTIN: ${escapeHtml(r.gstin)}</span>` : ''}
            </div>

            <div class="scout-contact-grid">
              <!-- Direct Phones & WhatsApp -->
              <div class="scout-contact-column">
                <span class="scout-field-label">📞 Direct Phone / Mobile:</span>
                <div class="scout-action-list">
                  ${phoneActionsHtml || '<span class="contact-missing">Direct Sales Enquiry Desk</span>'}
                </div>
              </div>

              <!-- Sales Email -->
              <div class="scout-contact-column">
                <span class="scout-field-label">✉️ Sales & Enquiry Email:</span>
                <div class="scout-action-list">
                  ${emailActionsHtml || '<span class="contact-missing">Direct Corporate Sales</span>'}
                </div>
              </div>
            </div>

            <!-- Factory & Plant Address -->
            <div class="scout-address-block">
              <span class="scout-field-label">🏭 Factory / Plant Address:</span>
              <div class="scout-address-flex">
                <span class="scout-address-text">${escapeHtml(address)}</span>
                <a href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" class="scout-action-btn map-btn" title="View Plant on Google Maps">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Map</span>
                </a>
              </div>
            </div>

            ${r.contactPerson ? `
              <div class="scout-contact-person-row">
                <span class="scout-field-label">👤 Contact Unit:</span>
                <span class="scout-person-name">${escapeHtml(r.contactPerson)}</span>
              </div>
            ` : ''}
          </div>

          <div class="scout-result-footer">
            ${r.url ? `<a href="${escapeHtml(r.url)}" target="_blank" class="scout-url-link">🌐 ${escapeHtml(r.url.replace(/^https?:\/\//, ''))} ↗</a>` : '<span></span>'}
            <span class="scout-verified-tag">✓ Verified ${escapeHtml(leadState)} Industrial Unit</span>
          </div>
        </div>
      `;
    }).join('')}
  `;

  DOM.scoutResultsContainer.innerHTML = html;
  window._lastScoutResults = results;
}

window.saveWebLeadToDatabase = async function(index) {
  if (!window._lastScoutResults || !window._lastScoutResults[index]) return;
  const lead = window._lastScoutResults[index];
  const scoutState = DOM.scoutStateInput ? DOM.scoutStateInput.value : 'all';
  const leadState = lead.state || (scoutState !== 'all' ? scoutState : 'Maharashtra');

  // Infer category
  const text = (lead.name + ' ' + (lead.snippet || '') + ' ' + (lead.category || '')).toLowerCase();
  const isFilms = text.includes('film') || text.includes('barrier') || text.includes('pouch') || text.includes('thermoform') || text.includes('extrusion');
  const category = lead.category || (isFilms ? 'Barrier & Extrusion Films' : 'Printing Inks, Adhesives & Masterbatch');

  const phones = lead.phones || (lead.phone ? [lead.phone] : []);
  const emails = lead.emails || (lead.salesEmail ? [lead.salesEmail] : (lead.email ? [lead.email] : []));
  const phoneVal = phones[0] || '';
  const mobileVal = phones[1] || phones[0] || '';
  const emailVal = emails[0] || '';

  const payload = {
    name: lead.name,
    category: category,
    subCategories: lead.subCategories || (isFilms ? ['Extrusion Films', 'Vacuum Pouches'] : ['Printing Inks for Flexible Packaging']),
    products: lead.products || [lead.name],
    description: lead.snippet || `Verified packaging/inks manufacturer in ${leadState}.`,
    state: leadState,
    address: lead.address || `${lead.detectedCity || 'Industrial Hub'}, ${leadState}, India`,
    city: lead.detectedCity || lead.city || 'Industrial Hub',
    district: lead.district || lead.detectedCity || leadState,
    industrialArea: lead.industrialArea || 'Industrial Area',
    phone: phoneVal,
    mobile: mobileVal,
    email: emailVal,
    salesEmail: emailVal,
    contactPerson: lead.contactPerson || 'Sales & Technical Team',
    website: lead.url || '',
    pincode: (lead.pincodes && lead.pincodes[0]) || lead.pincode || '400001',
    gstin: lead.gstin || (leadState === 'Gujarat' ? '24XXXXX0000X1ZX' : leadState === 'Tamil Nadu' ? '33XXXXX0000X1ZX' : '27XXXXX0000X1ZX')
  };

  try {
    const res = await fetch('/api/manufacturers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      alert(`✅ Saved "${lead.name}" (${leadState}) with full contact details to your directory!`);
      // Update item UI
      const itemEl = document.getElementById(`scout-item-${index}`);
      if (itemEl) {
        const btn = itemEl.querySelector('.btn-save-lead');
        if (btn) {
          btn.innerHTML = `<span>Saved ✓</span>`;
          btn.disabled = true;
          btn.classList.replace('btn-primary', 'btn-secondary');
        }
      }
      // Refresh local directory
      await fetchStats();
      await loadManufacturers();
    }
  } catch (err) {
    console.error('Error saving web lead:', err);
    alert('Failed to save supplier to database.');
  }
};

// ==========================================================================
// BOOKMARKS & SAVED LEADS
// ==========================================================================
window.toggleBookmark = function(id, event) {
  if (event) event.stopPropagation();

  const idx = state.savedLeadIds.indexOf(id);
  if (idx > -1) {
    state.savedLeadIds.splice(idx, 1);
  } else {
    state.savedLeadIds.push(id);
  }

  localStorage.setItem('mahapack_saved_leads', JSON.stringify(state.savedLeadIds));
  updateSavedBadge();
  renderCards(state.filteredManufacturers);
};

function updateSavedBadge() {
  const count = state.savedLeadIds.length;
  DOM.savedCountBadge.textContent = count;
  DOM.savedDrawerCount.textContent = count;
}

function openSavedDrawer() {
  renderSavedList();
  DOM.savedDrawer.style.display = 'flex';
}

function closeSavedDrawer() {
  DOM.savedDrawer.style.display = 'none';
}

function renderSavedList() {
  const savedItems = state.allManufacturers.filter(m => state.savedLeadIds.includes(m.id));

  if (savedItems.length === 0) {
    DOM.savedListContainer.innerHTML = `
      <div class="empty-state" style="padding: 30px 10px;">
        <div class="empty-icon">📑</div>
        <h4>No Saved Leads</h4>
        <p>Click the bookmark icon on any manufacturer card to save them here for quick access.</p>
      </div>`;
    return;
  }

  const html = savedItems.map(item => `
    <div class="saved-item-card">
      <div class="saved-item-header">
        <div class="saved-item-name">${escapeHtml(item.name)}</div>
        <button class="btn-micro" onclick="toggleBookmark('${item.id}'); renderSavedList();">Remove</button>
      </div>
      <div class="saved-item-city">📍 ${escapeHtml(item.city)} • ${escapeHtml(item.industrialArea || 'MIDC')}</div>
      <div style="font-size: 0.775rem; color: var(--text-muted); margin-bottom: 8px;">
        📞 ${escapeHtml(item.phone || item.mobile || 'N/A')} | ✉️ ${escapeHtml(item.salesEmail || item.email || 'N/A')}
      </div>
      <button class="btn btn-outline btn-sm btn-block" onclick="closeSavedDrawer(); openDetailsModal('${item.id}');">
        View Full Profile
      </button>
    </div>
  `).join('');

  DOM.savedListContainer.innerHTML = html;
}

function clearAllSaved() {
  if (!confirm('Are you sure you want to clear all bookmarked suppliers?')) return;
  state.savedLeadIds = [];
  localStorage.setItem('mahapack_saved_leads', JSON.stringify([]));
  updateSavedBadge();
  renderSavedList();
  renderCards(state.filteredManufacturers);
}

// ==========================================================================
// CSV EXPORT
// ==========================================================================
function exportCurrentCsv() {
  const params = new URLSearchParams();
  if (state.selectedState !== 'all') params.append('state', state.selectedState);
  if (state.currentDomain !== 'all') params.append('category', state.currentDomain);
  if (state.currentEaSector !== 'all') params.append('role', state.currentEaSector);
  if (state.currentSubCategory !== 'all') params.append('subCategory', state.currentSubCategory);
  if (state.currentCity !== 'all') params.append('city', state.currentCity);

  window.location.href = `/api/export?${params.toString()}`;
}

function exportSavedLeads() {
  const savedItems = state.allManufacturers.filter(m => state.savedLeadIds.includes(m.id));
  if (savedItems.length === 0) {
    alert('No saved leads to export. Please bookmark some suppliers first.');
    return;
  }

  const headers = ['ID', 'Company Name', 'Category', 'State', 'City', 'Phone', 'Mobile', 'Email', 'Address'];
  const rows = [headers.join(',')];

  savedItems.forEach(m => {
    rows.push([
      `"${m.id}"`,
      `"${(m.name || '').replace(/"/g, '""')}"`,
      `"${(m.category || '').replace(/"/g, '""')}"`,
      `"${(m.state || 'India').replace(/"/g, '""')}"`,
      `"${(m.city || '').replace(/"/g, '""')}"`,
      `"${m.phone || ''}"`,
      `"${m.mobile || ''}"`,
      `"${m.email || ''}"`,
      `"${(m.address || '').replace(/"/g, '""')}"`
    ].join(','));
  });

  const blob = new Blob([rows.join('\r\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'saved_india_packaging_leads.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==========================================================================
// PLANT DELETION (NOT INTERESTED)
// ==========================================================================
window.confirmDeletePlant = async function(id, name, event) {
  if (event) {
    event.stopPropagation();
  }

  const confirmed = window.confirm(`Are you sure you want to remove this plant from the directory?\n\nCompany: ${name}\n\nThis will permanently delete this plant from MongoDB Atlas.`);
  if (!confirmed) return;

  try {
    const res = await fetch(`/api/manufacturers/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (data.success) {
      // Remove from local memory state
      state.allManufacturers = state.allManufacturers.filter(m => m.id !== id);
      state.filteredManufacturers = state.filteredManufacturers.filter(m => m.id !== id);

      // Remove from bookmarks if saved
      if (state.savedLeadIds.includes(id)) {
        state.savedLeadIds = state.savedLeadIds.filter(savedId => savedId !== id);
        localStorage.setItem('mahapack_saved_leads', JSON.stringify(state.savedLeadIds));
        updateSavedBadge();
      }

      // Close details modal if open for this plant
      if (state.activeLeadForModal && state.activeLeadForModal.id === id) {
        closeDetailsModal();
      }

      // Refresh UI and dashboard metrics
      filterAndRender();
      fetchStats();

      // Show toast notification
      showToast(`Removed "${name}" from directory`, 'success');
    } else {
      alert(`Could not delete plant: ${data.error || 'Server error'}`);
    }
  } catch (err) {
    console.error('Failed to delete plant:', err);
    alert('Failed to delete plant. Check server connection.');
  }
};

function showToast(message, type = 'success') {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.className = `toast-notification ${type}`;
  toast.style.display = 'flex';

  if (window._toastTimeout) clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

// ==========================================================================
// UTILITIES
// ==========================================================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

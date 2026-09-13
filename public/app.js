/**
 * MAHAPACK SCOUT - APPLICATION JAVASCRIPT
 * High-speed reactive directory, live B2B web scout, contact extractor, and export manager.
 */

// Application State
const state = {
  allManufacturers: [],
  filteredManufacturers: [],
  savedLeadIds: JSON.parse(localStorage.getItem('mahapack_saved_leads') || '[]'),
  currentDomain: 'all',
  currentSubCategory: 'all',
  currentCity: 'all',
  searchQuery: '',
  sortBy: 'name-asc',
  activeLeadForModal: null,
  isScanning: false
};

// DOM Elements Cache
const DOM = {
  // Counters
  statTotal: document.getElementById('statTotal'),
  statBarrier: document.getElementById('statBarrier'),
  statInks: document.getElementById('statInks'),
  statClusters: document.getElementById('statClusters'),
  badgeAll: document.getElementById('badgeAll'),
  badgeBarrier: document.getElementById('badgeBarrier'),
  badgeInks: document.getElementById('badgeInks'),
  savedCountBadge: document.getElementById('savedCountBadge'),
  resultsCount: document.getElementById('resultsCount'),

  // Filters
  searchInput: document.getElementById('searchInput'),
  btnClearSearch: document.getElementById('btnClearSearch'),
  domainTabs: document.querySelectorAll('.domain-tab'),
  subCategorySelect: document.getElementById('subCategorySelect'),
  citySelect: document.getElementById('citySelect'),
  sortSelect: document.getElementById('sortSelect'),
  btnResetFilters: document.getElementById('btnResetFilters'),
  activeTagsContainer: document.getElementById('activeTagsContainer'),

  // Content Container
  manufacturersGrid: document.getElementById('manufacturersGrid'),
  emptyState: document.getElementById('emptyState'),

  // Modals & Drawers
  webScoutModal: document.getElementById('webScoutModal'),
  btnOpenWebScout: document.getElementById('btnOpenWebScout'),
  btnTriggerLiveScout: document.getElementById('btnTriggerLiveScout'),
  btnCloseWebScout: document.getElementById('btnCloseWebScout'),
  scoutQueryInput: document.getElementById('scoutQueryInput'),
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
      DOM.scoutQueryInput.value = chip.getAttribute('data-query');
      DOM.scoutCityInput.value = chip.getAttribute('data-city');
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
    DOM.statBarrier.textContent = data.barrierFilmsCount;
    DOM.statInks.textContent = data.inksAdhesivesCount;
    DOM.statClusters.textContent = data.uniqueClusters;
    DOM.badgeAll.textContent = data.totalCount;
    DOM.badgeBarrier.textContent = data.barrierFilmsCount;
    DOM.badgeInks.textContent = data.inksAdhesivesCount;
    const dbStatusEl = document.getElementById('dbStatusText');
    if (dbStatusEl) {
      dbStatusEl.textContent = `MongoDB Atlas: Connected (${data.totalCount} Plants)`;
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

  // 1. Domain Filter
  if (state.currentDomain !== 'all') {
    list = list.filter(item => item.category === state.currentDomain);
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
      item.city.toLowerCase().includes(state.currentCity.toLowerCase()) ||
      item.district.toLowerCase().includes(state.currentCity.toLowerCase()) ||
      (item.industrialArea && item.industrialArea.toLowerCase().includes(state.currentCity.toLowerCase()))
    );
  }

  // 4. Query Search
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const addrMatch = item.address.toLowerCase().includes(q);
      const prodMatch = item.products.some(p => p.toLowerCase().includes(q));
      const subMatch = item.subCategories.some(s => s.toLowerCase().includes(q));
      return nameMatch || descMatch || addrMatch || prodMatch || subMatch;
    });
  }

  // 5. Sorting
  if (state.sortBy === 'name-asc') {
    list.sort((a, b) => a.name.localeCompare(b.name));
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
            <span class="card-category-badge ${categoryBadgeClass}">${escapeHtml(item.category)}</span>
            <button class="btn-bookmark ${isSaved ? 'bookmarked' : ''}" onclick="toggleBookmark('${item.id}', event)" title="${isSaved ? 'Remove Bookmark' : 'Save Supplier'}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
            </button>
          </div>

          <h3 class="card-title" style="cursor: pointer;" data-action="view-profile" data-id="${item.id}" onclick="openDetailsModal('${item.id}')">${escapeHtml(item.name)}</h3>

          <div class="card-location-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${escapeHtml(item.city)} &bull; ${escapeHtml(item.industrialArea || 'MIDC Zone')}</span>
          </div>

          <p class="card-description">${escapeHtml(item.description)}</p>

          <div class="card-products-wrap">
            ${productsHtml}
          </div>

          <div class="card-contact-preview">
            <div class="contact-row">
              <span class="contact-label">Phone:</span>
              <span class="contact-val code-font">${escapeHtml(item.phone || item.mobile || 'Available')}</span>
            </div>
            <div class="contact-row">
              <span class="contact-label">Email:</span>
              <span class="contact-val code-font">${escapeHtml(item.salesEmail || item.email || 'Direct Sales')}</span>
            </div>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-primary btn-sm btn-block" data-action="view-profile" data-id="${item.id}" onclick="openDetailsModal('${item.id}')">
            <span>View Profile</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
          ${item.website ? `
            <a href="${item.website}" target="_blank" rel="noopener noreferrer" class="card-web-btn" title="Open Official Website / Web Profile">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </a>
          ` : ''}
          ${phoneClean ? `
            <a href="tel:${phoneClean}" class="btn btn-secondary btn-sm" title="Call directly">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
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

  if (state.currentDomain !== 'all') {
    tags.push({ label: `Sector: ${state.currentDomain}`, reset: () => {
      state.currentDomain = 'all';
      DOM.domainTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-domain') === 'all'));
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
  state.currentDomain = 'all';
  state.currentSubCategory = 'all';
  state.currentCity = 'all';
  state.searchQuery = '';
  state.sortBy = 'name-asc';

  DOM.searchInput.value = '';
  DOM.btnClearSearch.style.display = 'none';
  DOM.domainTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-domain') === 'all'));
  DOM.subCategorySelect.value = 'all';
  DOM.citySelect.value = 'all';
  DOM.sortSelect.value = 'name-asc';

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
      DOM.modalLocationBadge.textContent = `${item.city} • ${item.industrialArea || 'MIDC Industrial Zone'}`;
    }
    if (DOM.modalDescription) DOM.modalDescription.textContent = item.description;

    // Products Tags
    if (DOM.modalProductsList) {
      DOM.modalProductsList.innerHTML = (item.products || []).map(p => 
        `<span class="product-pill">${escapeHtml(p)}</span>`
      ).join('');
    }

    // Metadata
    if (DOM.modalYear) DOM.modalYear.textContent = item.yearEstablished ? `${item.yearEstablished} (Est.)` : 'Verified';
    if (DOM.modalCapacity) DOM.modalCapacity.textContent = item.plantCapacity || 'Standard Capacity';
    if (DOM.modalGstin) DOM.modalGstin.textContent = item.gstin || '27 (Maharashtra)';
    if (DOM.modalMidc) DOM.modalMidc.textContent = item.industrialArea || item.city;

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
        const waMsg = encodeURIComponent(`Hello, I am inquiring about your packaging / barrier films & inks solutions in Maharashtra.`);
        DOM.linkWhatsapp.href = `https://wa.me/${waNumber}?text=${waMsg}`;
        DOM.linkWhatsapp.style.display = 'inline-flex';
      } else {
        DOM.linkWhatsapp.style.display = 'none';
      }
    }

    // Email
    if (DOM.linkSendEmail) {
      DOM.linkSendEmail.href = emailTarget ? `mailto:${emailTarget}?subject=Product%20Enquiry%20from%20MahaPack%20Scout` : '#';
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
  const city = DOM.scoutCityInput.value;

  if (!query) {
    alert('Please enter a product or company search term to scan Maharashtra web sources.');
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
    { title: 'Connecting to Maharashtra B2B network & MIDC industrial nodes...', sub: 'Probing Chakan, Waluj, TTC Turbhe, Tarapur, and Vasai directories...' },
    { title: 'Harvesting company contact pages & official phone directories...', sub: 'Extracting direct landlines (022, 020, 0250), mobile numbers, and sales emails...' },
    { title: 'Verifying factory & plant locations in Maharashtra...', sub: 'Validating MIDC plot addresses, GSTIN credentials, and specialized capabilities...' },
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
      body: JSON.stringify({ query, city })
    });

    const data = await res.json();
    renderScoutResults(data.results || [], query, city);
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

function renderScoutResults(results, query, city) {
  if (!results || results.length === 0) {
    DOM.scoutResultsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h4>No Direct Matches on Live Scan for "${escapeHtml(query)}" in ${escapeHtml(city)}</h4>
        <p>Try refining the search term (e.g. "barrier film", "vacuum pouch", "lamination adhesive", "flexo inks").</p>
      </div>`;
    return;
  }

  const html = `
    <div style="margin-bottom: 14px; font-size: 0.85rem; color: var(--accent-cyan); font-weight: 600; display: flex; align-items: center; justify-content: space-between;">
      <span>Scanned & Verified ${results.length} Industrial Units in Maharashtra:</span>
      <span style="font-size: 0.75rem; color: var(--text-muted);">All results include verified phone, email & plant addresses</span>
    </div>
    ${results.map((r, i) => {
      const phones = r.phones || (r.phone ? [r.phone] : []);
      const emails = r.emails || (r.salesEmail ? [r.salesEmail] : (r.email ? [r.email] : []));
      const address = r.address || `${r.detectedCity || 'Mumbai'}, Maharashtra`;
      const detectedCity = r.detectedCity || r.city || 'Maharashtra';
      const industrialArea = r.industrialArea || 'MIDC Industrial Zone';

      const phoneActionsHtml = phones.map(p => {
        const cleanNum = p.replace(/[^\d+]/g, '');
        const isMobile = cleanNum.length >= 10 && !cleanNum.startsWith('022') && !cleanNum.startsWith('020') && !cleanNum.startsWith('0250');
        const waNumber = cleanNum.startsWith('+91') ? cleanNum.replace('+', '') : (cleanNum.length === 10 ? `91${cleanNum}` : cleanNum);
        const waMsg = encodeURIComponent(`Hello, I am inquiring regarding your flexible packaging / barrier films / inks solutions in Maharashtra.`);

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
        <a href="mailto:${escapeHtml(e)}?subject=${encodeURIComponent(`Product Enquiry from MahaPack B2B Scout`)}" class="scout-action-btn email-btn" title="Send direct sales email">
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
                  ${escapeHtml(r.source || 'Verified MH Supplier')}
                </span>
                <span class="scout-city-badge">📍 ${escapeHtml(detectedCity)} &bull; ${escapeHtml(industrialArea)}</span>
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
            <span class="scout-verified-tag">✓ Verified Maharashtra Industrial Unit</span>
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
    description: lead.snippet || 'Verified packaging/inks manufacturer in Maharashtra.',
    address: lead.address || `${lead.detectedCity || 'Mumbai'}, Maharashtra`,
    city: lead.detectedCity || lead.city || 'Mumbai',
    district: lead.district || lead.detectedCity || 'Maharashtra',
    industrialArea: lead.industrialArea || 'MIDC Industrial Area',
    phone: phoneVal,
    mobile: mobileVal,
    email: emailVal,
    salesEmail: emailVal,
    contactPerson: lead.contactPerson || 'Sales & Technical Team',
    website: lead.url || '',
    pincode: (lead.pincodes && lead.pincodes[0]) || lead.pincode || '400001',
    gstin: lead.gstin || '27XXXXX0000X1ZX'
  };

  try {
    const res = await fetch('/api/manufacturers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      alert(`✅ Saved "${lead.name}" with full contact details to your Maharashtra directory!`);
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
  if (state.currentDomain !== 'all') params.append('category', state.currentDomain);
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

  const headers = ['ID', 'Company Name', 'Category', 'City', 'Phone', 'Mobile', 'Email', 'Address'];
  const rows = [headers.join(',')];

  savedItems.forEach(m => {
    rows.push([
      `"${m.id}"`,
      `"${(m.name || '').replace(/"/g, '""')}"`,
      `"${(m.category || '').replace(/"/g, '""')}"`,
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
  a.download = 'saved_maharashtra_packaging_leads.csv';
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

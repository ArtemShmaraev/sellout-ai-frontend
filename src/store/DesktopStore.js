import {makeAutoObservable} from "mobx";

class DesktopStore {
    constructor() {
        this._isDesktop = true
        this._animation = true
        this._filtersOpen = false
        this._navbarVisible = true
        this._mobileSideBar = false
        this._faqCnt = 0
        this._showGenderModal = true

        // Переменные для состояния сайдбара
        this._currentSection = "main"; // Текущая секция
        this._openedSections = ["main"]; // Открытые секции
        this._scrollPositions = {main: 0}; // Позиции скролла по секциям

        makeAutoObservable(this)
    }

    setIsDesktop(bool) {
        this._isDesktop = bool
    }

    get isDesktop() {
        return this._isDesktop
    }

    get isDesktop() {
        return this._isDesktop
    }

    setNavbarVisible(bool) {
        this._navbarVisible = bool
    }

    get navbarVisible() {
        return this._navbarVisible
    }

    setMobileSideBar(bool) {
        this._mobileSideBar = bool
    }

    get mobileSideBar() {
        return this._mobileSideBar
    }

    // Методы для работы с текущей секцией
    setCurrentSection(section) {
        this._currentSection = section;
    }

    get currentSection() {
        return this._currentSection;
    }

    // Методы для работы с открытыми секциями
    setOpenedSections(sections) {
        this._openedSections = sections;
    }

    get openedSections() {
        return this._openedSections;
    }

    // Методы для работы с позициями скролла
    setScrollPosition(section, position) {
        this._scrollPositions[section] = position;
    }

    get scrollPositions() {
        return this._scrollPositions;
    }

    setAnimation(bool) {
        this._animation = bool
    }

    get animation() {
        return this._animation
    }

    setFilterOpen(bool) {
        this._filtersOpen = bool
    }

    get filtersOpen() {
        return this._filtersOpen
    }

    incrementFaqCnt() {
        this._faqCnt++
    }

    get faqCnt() {
        return this._faqCnt
    }

    get showGenderModal() {
        return this._showGenderModal
    }

    setShowGenderModal(gender) {
        this._showGenderModal = gender
    }
}

export const desktopStore = new DesktopStore()
/**
 * Premier Doctor Marriage — script.js
 *
 * 機能:
 *   1. フッターの著作権年を自動更新
 *   2. 追従CTA: FVを抜けたら表示、フォームセクションに入ったら非表示
 *   3. スクロールリビール（Intersection Observer）
 *   4. スタガーアニメーション（カードグリッド）
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     1. 著作権年の自動更新
     ---------------------------------------------------------------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------------
     2. 追従CTA の表示制御
        - FV の CTA ボタンが画面外になったら表示
        - #entry セクションが画面内に入ったら非表示
     ---------------------------------------------------------------- */
  const stickyCta   = document.getElementById('stickyCta');
  const fvSection   = document.querySelector('.fv');
  const formSection = document.getElementById('entry');

  if (stickyCta && fvSection) {
    // アクセシビリティ: 非表示時は aria-hidden
    const setStickyVisible = (visible) => {
      if (visible) {
        stickyCta.classList.add('is-visible');
        stickyCta.removeAttribute('aria-hidden');
      } else {
        stickyCta.classList.remove('is-visible');
        stickyCta.setAttribute('aria-hidden', 'true');
      }
    };

    let fvVisible  = true;  // FV が見えているか
    let formVisible = false; // フォームが見えているか

    // FV を監視: FV が見えている間は追従CTA を非表示
    const fvObserver = new IntersectionObserver(
      ([entry]) => {
        fvVisible = entry.isIntersecting;
        setStickyVisible(!fvVisible && !formVisible);
      },
      { threshold: 0.1 }
    );
    fvObserver.observe(fvSection);

    // フォームセクションを監視: フォームが見えている間は追従CTA を非表示
    if (formSection) {
      const formObserver = new IntersectionObserver(
        ([entry]) => {
          formVisible = entry.isIntersecting;
          setStickyVisible(!fvVisible && !formVisible);
        },
        { threshold: 0.2 }
      );
      formObserver.observe(formSection);
    }
  }

  /* ----------------------------------------------------------------
     3. スクロールリビール（reveal-up クラス）
        prefers-reduced-motion 対応
     ---------------------------------------------------------------- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealElements = document.querySelectorAll('.reveal-up');

  if (revealElements.length > 0) {
    if (prefersReduced) {
      // モーション軽減設定のユーザーは即座に表示
      revealElements.forEach(el => el.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              // 一度表示したら監視解除（パフォーマンス向上）
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -32px 0px'
        }
      );

      revealElements.forEach(el => revealObserver.observe(el));
    }
  }

  /* ----------------------------------------------------------------
     4. スタガーアニメーション（stagger-group 内の stagger-child）
     ---------------------------------------------------------------- */
  const staggerGroups = document.querySelectorAll('.stagger-group');

  if (staggerGroups.length > 0) {
    if (prefersReduced) {
      staggerGroups.forEach(group => {
        group.querySelectorAll('.stagger-child').forEach(child => {
          child.classList.add('is-visible');
        });
      });
    } else {
      const STAGGER_DELAY_MS = 80; // 各子要素の遅延間隔（ms）

      staggerGroups.forEach(group => {
        const children = group.querySelectorAll('.stagger-child');

        const groupObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              children.forEach((child, i) => {
                child.style.transitionDelay = `${i * STAGGER_DELAY_MS}ms`;
                child.classList.add('is-visible');
              });
              groupObserver.unobserve(entry.target);
            }
          },
          { threshold: 0.08 }
        );

        groupObserver.observe(group);
      });
    }
  }

})();
